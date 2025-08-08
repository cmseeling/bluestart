import * as schema from '@bluestart/database/schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from '$env/dynamic/private';
// import { databaseURL } from './config';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema });
export type DB = typeof db;



// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// // import * as schema from './schema';
// import { databaseURL } from '@bluestart/database'
// // import { databaseURL, drizzle } from '@bluestart/database'
// import * as schema from '@bluestart/database/schema';

// const client = new Database(databaseURL);

// export const db = drizzle(client, { schema });
// export type DB = typeof db;
