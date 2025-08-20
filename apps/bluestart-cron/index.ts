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
import type { User } from '@bluestart/database/types';
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
    .from(schema.commands)
    .leftJoin(schema.commandSettings, eq(schema.commands.id, schema.commandSettings.commandId))
    .leftJoin(schema.commandDelays, eq(schema.commands.id, schema.commandDelays.commandId))
    .leftJoin(schema.pauseDates, eq(schema.commands.id, schema.pauseDates.commandId))
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
        eq(schema.commands.day, date.getDay()),
        gt(schema.commands.activationTime, lowerBoundTimeString),
        lt(schema.commands.activationTime, upperBoundTimeString),
        or(lt(schema.commands.lastExecuted, lowerBound), isNull(schema.commands.lastExecuted)),
        eq(schema.commands.isDisabled, false),
        or(
          and(isNull(schema.pauseDates.pauseDateStart), isNull(schema.pauseDates.pauseDateEnd)),
          not(
            and(
              lt(schema.pauseDates.pauseDateStart, today),
              gt(schema.pauseDates.pauseDateEnd, today)
            )
          )
        )
      )
    );

  return results;
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
    if (result.commandDelays) {
      const activationTimestamp = new Date(
        `${formatISO(now, { representation: 'date' })} ${result.commands.activationTime}`
      );
      const shiftedActivationTime = addMinutes(result.commandDelays.delay, activationTimestamp);
      if (shiftedActivationTime < upperBound) {
        return true;
      }
    } else {
      return true;
    }
  });

  console.log('Total filtered: ' + filteredResults.length);
  console.log(filteredResults);

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
