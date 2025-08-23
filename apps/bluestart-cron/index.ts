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
import type { CommandWithAllData, User } from '@bluestart/database/types';
import { getGeocoding } from '@bluestart/geocode-client';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { getCurrentWeather, getDailyForecasts } from '@bluestart/weather-client';
import Database from 'better-sqlite3';
import { formatISO } from 'date-fns';
import { addMinutes, format } from 'date-fns/fp';
import * as dotenv from 'dotenv';

const getCommands = async (
  db: BetterSQLite3Database<typeof schema> & { $client: Database.Database },
  date: Date,
  lowerBound: Date,
  upperBound: Date
) => {
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
          lt(schema.commandTable.lastExecuted, lowerBound),
          isNull(schema.commandTable.lastExecuted)
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

  const reducedCommands: Map<string, Omit<CommandWithAllData, 'pauseDates'>> = results.reduce(
    (map, result, index) => {
      // add a new entry
      if (!map.has(result.command.id)) {
        map.set(result.command.id, {
          ...result.command,
          settings: result.commandSettings,
          delays: result.commandDelay ? [result.commandDelay] : []
        });
      }
      // add the delays to the existing entry
      else {
        const existingEntry = map.get(result.command.id);
        // null check for delay
        if (existingEntry && result.commandDelay) {
          existingEntry.delays.push(result.commandDelay);
        }
      }

      return map;
    },
    new Map()
  );

  // const results = await db.query.command.findMany({
  //   where: and(
  //     eq(schema.command.day, date.getDay()),
  //     gt(schema.command.activationTime, lowerBoundTimeString),
  //     lt(schema.command.activationTime, upperBoundTimeString),
  //     or(lt(schema.command.lastExecuted, lowerBound), isNull(schema.command.lastExecuted)),
  //     eq(schema.command.isDisabled, false)
  //   ),
  //   with: {
  //     settings: true,
  //     delays: true,
  //     pauseDates: true
  //   }
  // });

  // return results;
  return Array.from(reducedCommands.values());
};

async function main() {
  dotenv.config();
  const dotenvConfig = dotenvConfigSchema.parse(process.env);

  console.log('db url: ' + dotenvConfig.databaseUrl);

  const client = new Database(dotenvConfig.databaseUrl);

  const db = drizzle(client, { schema });

  // console.log(user.id, user.username, user.isMasterAccount);

  // TODO: get deviation value from .env
  const deviation = 5;
  const now = new Date('August 18, 2025 07:30:00');
  const lowerBound = addMinutes(-deviation, now);
  const upperBound = addMinutes(deviation, now);

  const results = await getCommands(db, now, lowerBound, upperBound);
  // console.log(results);
  console.log('Total from db: ' + results.length);

  /*
  for each result, if activation time + delay is still within the range, move ahead with next logic
  */
  const filteredResults = results.filter((result) => {
    if (result.delays.length > 0) {
      // for now, assume there will only ever be one delay per day
      const delayToday = result.delays.find((delay) => {
        return delay.date === formatISO(now, { representation: 'date' });
      });
      if (delayToday) {
        const activationTimestamp = new Date(
          `${formatISO(now, { representation: 'date' })} ${result.activationTime}`
        );
        const shiftedActivationTime = addMinutes(delayToday.delay, activationTimestamp);
        if (shiftedActivationTime >= upperBound) {
          return false;
        }
      }
    }
    return true;
  });

  console.log(filteredResults);
  console.log('Total filtered: ' + filteredResults.length);

  // const goecodingResponse = await getGeocoding('minneapolis mn');
  // console.log(goecodingResponse);

  const lat = 45.9763;
  const lon = -94.3625;

  // const currentConditions = await getCurrentWeather(lat, lon);
  // console.log(currentConditions);

  // const dailyForecasts = await getDailyForecasts(lat, lon);
  // console.log(dailyForecasts);
}

main();

// import BlueLinky from 'bluelinky';

// const client = new BlueLinky({
//   username: 'email',
//   password: 'password',
//   brand: 'hyundai',
//   region: 'US',
//   pin: '1234'
// });

// client.on('ready', async () => {
//   const vehicle = client.getVehicle('VIN');
//   const response = await vehicle?.status({ parsed: true, refresh: false });
//   console.log(response);
//   const location = await vehicle?.location();
//   console.log(location);
//   const startResponse = await vehicle?.start({
//     hvac: true,
//     defrost: true,
//     heatedFeatures: true,
//     temperature: 85,
//     duration: 10,
//     unit: 'F'
//   });
//   const stopResponse = await vehicle?.stop();
//   const chargeStartResponse = await vehicle?.startCharge();
//   const chargeStopResponse = await vehicle?.stopCharge();
// });
