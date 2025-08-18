import { drizzle, eq, schema } from '@bluestart/database';
import type { User } from '@bluestart/database/types';
import { getGeocoding } from '@bluestart/geocode-client';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { getCurrentWeather, getDailyForecasts } from '@bluestart/weather-client';
import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';

const getCommands = async (db: BetterSQLite3Database<typeof schema>) => {};

async function main() {
  dotenv.config();
  const dotenvConfig = dotenvConfigSchema.parse(process.env);

  console.log('db url: ' + dotenvConfig.databaseUrl);

  const client = new Database(dotenvConfig.databaseUrl);

  const db = drizzle(client, { schema });

  const user: User = await db.query.userTable.findFirst({
    where: eq(schema.userTable.username, 'chris')
  });

  console.log(user.id, user.username, user.isMasterAccount);

  // const goecodingResponse = await getGeocoding('minneapolis mn');
  // console.log(goecodingResponse);

  const lat = 45.9763;
  const lon = -94.3625;

  // const currentConditions = await getCurrentWeather(lat, lon);
  // console.log(currentConditions);

  const dailyForecasts = await getDailyForecasts(lat, lon);
  console.log(dailyForecasts);
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
