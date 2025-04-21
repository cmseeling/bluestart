import "dotenv/config";
import type { Config } from 'drizzle-kit';
import serverConfig from '@bluestart/shared/config';

const dbName = "bluestart.db";
const databaseURL = serverConfig.databasePath ? `${serverConfig.databasePath}/${dbName}` : `./${dbName}`;

export default {
  schema: './schema.ts',
  dbCredentials: { url: databaseURL },
  verbose: true,
  strict: true,
  dialect: 'sqlite',
  out: './drizzle'
} satisfies Config;
