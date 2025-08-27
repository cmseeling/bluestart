import {
  and,
  BetterSQLite3Database,
  drizzle,
  eq,
  gt,
  isNull,
  lt,
  not,
  or,
  schema
} from '@bluestart/database';
import type {
  CommandWithSettings,
  Geolocation,
  LocationConfiguration
} from '@bluestart/database/types';
import { getGeocoding } from '@bluestart/geocode-client';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import type { WeatherClientConfig } from '@bluestart/weather-client';
import { getCurrentWeather } from '@bluestart/weather-client';
import Database from 'better-sqlite3';
import { BlueLinky } from 'bluelinky';
import { formatISO } from 'date-fns';
import { addMinutes, format } from 'date-fns/fp';
import * as dotenv from 'dotenv';

const getCommands = async (
  db: BetterSQLite3Database<typeof schema> & { $client: Database.Database },
  date: Date,
  timeBuffer: number,
  logger?: ConsoleLogger
): Promise<CommandWithSettings[]> => {
  const lowerBound = addMinutes(-timeBuffer, date);
  const upperBound = addMinutes(timeBuffer, date);
  const lowerBoundTimeString = format('h:mm', lowerBound);
  const upperBoundTimeString = format('h:mm', upperBound);
  const today = formatISO(date, { representation: 'date' });

  const results = await db
    .select()
    .from(schema.commandTable)
    .leftJoin(
      schema.commandSettingsTable,
      eq(schema.commandTable.id, schema.commandSettingsTable.commandId)
    )
    .leftJoin(
      schema.commandDelayTable,
      eq(schema.commandTable.id, schema.commandDelayTable.commandId)
    )
    .leftJoin(schema.pauseRangeTable, eq(schema.commandTable.id, schema.pauseRangeTable.commandId))
    /*
    Retrieve all commands that:
    - are scheduled for today
    - within the specified time range
    - have not been executed within the specified time range
    - are not disabled
    - are not paused for today
    */
    .where(
      and(
        eq(schema.commandTable.day, date.getDay()),
        gt(schema.commandTable.activationTime, lowerBoundTimeString),
        lt(schema.commandTable.activationTime, upperBoundTimeString),
        or(
          lt(schema.commandTable.lastChecked, lowerBound),
          isNull(schema.commandTable.lastChecked)
        ),
        eq(schema.commandTable.isDisabled, false),
        or(
          and(
            isNull(schema.pauseRangeTable.pauseDateStart),
            isNull(schema.pauseRangeTable.pauseDateEnd)
          ),
          not(
            and(
              lt(schema.pauseRangeTable.pauseDateStart, today),
              gt(schema.pauseRangeTable.pauseDateEnd, today)
            )
          )
        )
      )
    );
  if (logger) {
    logger.debug(results);
  }

  /*
  for each result, if activation time + delay is still within the range, move ahead with next logic
  */
  const filteredResults = results.filter((result) => {
    if (result.commandDelay) {
      const activationTimestamp = new Date(
        `${formatISO(date, { representation: 'date' })} ${result.command.activationTime}`
      );
      const shiftedActivationTime = addMinutes(result.commandDelay.delay, activationTimestamp);
      if (shiftedActivationTime >= upperBound) {
        return false;
      }
    }
    return true;
  });
  if (logger) {
    logger.debug(filteredResults);
  }

  const reducedCommands: CommandWithSettings[] = filteredResults.reduce((accum, result, index) => {
    if (!accum.some((command) => command.id === result.command.id)) {
      accum.push({
        ...result.command,
        settings: result.commandSettings
      });
    }

    return accum;
  }, []);

  return reducedCommands;
};

const getLocationGeocode = async (
  db: BetterSQLite3Database<typeof schema> & { $client: Database.Database },
  logger?: ConsoleLogger
): Promise<Geolocation> => {
  const config = await db.query.configurationTable.findFirst({
    where: eq(schema.configurationTable.key, 'location')
  });
  if (!config) {
    throw new Error('location config not found in database');
  }

  const locationConfig: LocationConfiguration = JSON.parse(config.value);

  if (!locationConfig.geolocation) {
    if (logger) {
      logger.info('Location geolocation not found, fetching from geocoding API');
    }
    const geocodingResponse = await getGeocoding(locationConfig.address);

    locationConfig.geolocation = {
      latitude: parseFloat(geocodingResponse[0].lat),
      longitude: parseFloat(geocodingResponse[0].lon)
    };

    const updateResult = await db
      .update(schema.configurationTable)
      .set({ value: JSON.stringify(locationConfig) })
      .where(eq(schema.configurationTable.key, 'location'));
    logger.debug(`Updated location config: ${JSON.stringify(locationConfig)}`);
  }

  return locationConfig.geolocation;
};

const getWeatherConfig = async (
  db: BetterSQLite3Database<typeof schema> & { $client: Database.Database },
  logger?: ConsoleLogger
): Promise<WeatherClientConfig> => {
  const config = await db.query.configurationTable.findFirst({
    where: eq(schema.configurationTable.key, 'weatherUnits')
  });
  if (!config) {
    throw new Error('Weather units configuration not found');
  }
  return JSON.parse(config.value) as WeatherClientConfig;
};

async function main() {
  dotenv.config();
  const dotenvConfig = dotenvConfigSchema.parse(process.env);

  const logger = new ConsoleLogger('bluestart-cron', dotenvConfig.logLevel);
  logger.debug(dotenvConfig);

  try {
    const dbClient = new Database(dotenvConfig.databaseUrl);
    const db = drizzle(dbClient, { schema });

    const now = new Date('August 18, 2025 07:30:00');

    const commands = await getCommands(db, now, dotenvConfig.timeBuffer, logger);
    logger.debug(commands);
    logger.info(`Total commands from db: ${commands.length}`);

    const location = await getLocationGeocode(db, logger);

    const weatherConfig = await getWeatherConfig(db, logger);

    const currentConditions = await getCurrentWeather(
      location.latitude,
      location.longitude,
      weatherConfig
    );
    logger.info(currentConditions);

    const blueLinkyClient = new BlueLinky({
      username: dotenvConfig.blueLinkUsername,
      password: dotenvConfig.blueLinkPassword,
      brand: dotenvConfig.blueLinkBrand,
      region: dotenvConfig.blueLinkRegion,
      pin: dotenvConfig.blueLinkPIN
    });

    blueLinkyClient.on('error', (error) => {
      // let outer try/catch log this
      throw error;
    });

    blueLinkyClient.on('ready', async () => {
      const vehicle = blueLinkyClient.getVehicle(dotenvConfig.vehicleVIN);
      commands.forEach(async (command) => {
        if (
          currentConditions.temperature >= command.settings.tempAbove ||
          currentConditions.temperature <= command.settings.tempBelow
        ) {
          const startResponse = await vehicle.start({
            hvac: true,
            duration: 10,
            defrost: command.settings.defrost,
            temperature: command.settings.hvacTemp,
            unit: command.settings.tempUnits,
            heatedFeatures: command.settings.heatedFeatures
          });
        }

        const commandUpdateResult = await db
          .update(schema.commandTable)
          .set({ lastChecked: now })
          .where(eq(schema.commandTable.id, command.id));
        logger.info(commandUpdateResult);
      });
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

main();
