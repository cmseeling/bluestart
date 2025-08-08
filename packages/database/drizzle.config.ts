import dotenvConfig from '@bluestart/shared/config';
import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  dbCredentials: { url: dotenvConfig.databaseUrl },
  verbose: true,
  strict: true,
  dialect: 'sqlite',
  out: './drizzle'
} satisfies Config;
