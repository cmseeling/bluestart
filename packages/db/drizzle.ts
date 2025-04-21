import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import dbConfig from './drizzle.config';

const client = new Database(dbConfig.dbCredentials.url);

export const db = drizzle(client, { schema });
export type DB = typeof db;
