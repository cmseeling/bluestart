// // export * from './config';
// // export * from './database';
// export * from './enums';
// export * from './schema';
// export * from './types';
// // export { drizzle } from 'drizzle-orm/better-sqlite3';
// // export * from 'drizzle-orm';
// // export { SqliteError } from 'better-sqlite3';

export { db } from './database';
export type { DB } from './database';
export * as schema from './schema';
export * as enums from './enums';
export * as types from './types';
export { SqliteError } from 'better-sqlite3';
export * from 'drizzle-orm';