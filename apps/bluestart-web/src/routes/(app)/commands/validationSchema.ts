import { z } from 'zod';

export const newCommandSchema = z.object({
	name: z.string().min(1, 'Name is required.').max(100),
	day: z
		.string()
		.min(1, 'Day is required.')
		.transform((value) => (value === '' ? null : Number(value)))
		.refine((value) => !isNaN(Number(value)), { message: 'Expected number, received string' })
		.refine((value) => !(value === null || value < 0 || value > 6), {
			message: 'Day must be between 0 and 6'
		}),
	time: z.iso.time({ precision: -1, message: 'Time must be in HH:MM format.' }),
	thresholdType: z.enum(['above', 'below']),
	externalTemp: z
		.string()
		.min(1, 'External Temperature is required.')
		.transform((value) => (value === '' ? null : Number(value)))
		.refine((value) => !isNaN(Number(value)), {
			message: 'Expected number, received string'
		}),
	hvacTemp: z
		.string()
		.min(1, 'HVAC Temperature is required.')
		.transform((value) => (value === '' ? null : Number(value)))
		.refine((value) => !isNaN(Number(value)), {
			message: 'Expected number, received string'
		}),
	defrost: z.coerce.boolean(),
	heatedSeats: z.coerce.boolean()
});

export const updateCommandSchema = newCommandSchema.extend({
	id: z.string().min(1, 'ID is required.')
});
