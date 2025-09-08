import { z } from 'zod';

export const newCommandSchema = z.object({
	name: z.string().min(1, 'Name is required.').max(100),
	day: z.literal(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
	time: z.string().min(1, 'Time is required.').max(5, 'Time must be in HH:MM format.'),
	thresholdType: z.enum(['above', 'below']),
	externalTemp: z.coerce.number(),
	hvacTemp: z.coerce.number(),
	defrost: z.coerce.boolean(),
	heatedSeats: z.coerce.boolean()
});

export const updateCommandSchema = newCommandSchema.extend({
	id: z.uuid()
});
