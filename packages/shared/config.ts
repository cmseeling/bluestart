import { z } from 'zod';

const environment = z.object({
  DATABASE_PATH: z.string().default('')
});

const serverConfigSchema = environment.transform((env) => {
  return {
    databasePath: env.DATABASE_PATH
  };
});

const serverConfig = serverConfigSchema.parse(process.env);

export default serverConfig;
