import { z } from 'zod';
import { LogLevel } from './ConsoleLogger';

const environment = z.object({
  DATABASE_URL: z.string().default(''),
  BLUELINK_USERNAME: z.string().default(''),
  BLUELINK_PASSWORD: z.string().default(''),
  BLUELINK_BRAND: z.literal(['kia', 'hyundai']).default('hyundai'),
  BLUELINK_REGION: z.literal(['US', 'CA', 'EU', 'CN', 'AU']).default('US'),
  BLUELINK_PIN: z.string().default(''),
  VEHICLE_VIN: z.string().default(''),
  TIME_BUFFER: z.coerce.number().default(5),
  LOG_LEVEL: z.enum(LogLevel).default(LogLevel.ERROR)
});

export const dotenvConfigSchema = environment.transform((env) => {
  return {
    databaseUrl: env.DATABASE_URL,
    blueLinkUsername: env.BLUELINK_USERNAME,
    blueLinkPassword: env.BLUELINK_PASSWORD,
    blueLinkBrand: env.BLUELINK_BRAND,
    blueLinkRegion: env.BLUELINK_REGION,
    blueLinkPIN: env.BLUELINK_PIN,
    vehicleVIN: env.VEHICLE_VIN,
    timeBuffer: env.TIME_BUFFER,
    logLevel: env.LOG_LEVEL
  };
});

const dotenvConfig = dotenvConfigSchema.parse(process.env);

export default dotenvConfig;
