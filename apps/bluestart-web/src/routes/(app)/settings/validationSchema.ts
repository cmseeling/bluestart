import { z } from 'zod';

const settingsSchema = z.object({
	location: z.string().trim().max(300).min(1, 'Location is required.'),
	temperatureUnits: z.literal(['celsius', 'fahrenheit'], 'Temperature units are required.'),
	precipitationUnits: z.literal(['mm', 'inch'], 'Precipitation units are required.')
});

export default settingsSchema;
