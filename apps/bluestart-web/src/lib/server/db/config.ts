import { z } from 'zod';
import { env } from '$env/dynamic/private';

const environment = z.object({
  DATABASE_PATH: z.string().default('')
});

const dotenvConfigSchema = environment.transform((env) => {
  return {
    databasePath: env.DATABASE_PATH
  };
});

export const dotenvConfig = dotenvConfigSchema.parse(env.DATABASE_URL);

const dbName = "bluestart.db";
export const databaseURL = dotenvConfig.databasePath ? `${dotenvConfig.databasePath}/${dbName}` : `./${dbName}`;
