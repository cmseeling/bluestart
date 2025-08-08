import { z } from 'zod';

const environment = z.object({
  DATABASE_URL: z.string().default('')
});

const dotenvConfigSchema = environment.transform((env) => {
  return {
    databaseUrl: env.DATABASE_URL
  };
});

const dotenvConfig = dotenvConfigSchema.parse(process.env);

export default dotenvConfig;