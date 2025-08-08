import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
import * as schema from './schema';
import dotenvConfig from '@bluestart/shared/config';

dotenv.config();

const client = new Database(dotenvConfig.databaseUrl);

export const db = drizzle(client, { schema });
export type DB = typeof db;
