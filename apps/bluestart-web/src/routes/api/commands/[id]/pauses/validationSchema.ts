import { z } from 'zod';

export const pauseSchema = z.object({
	pauseDateStart: z.date({
		error: (issue) => (issue.input === undefined ? 'Required' : 'Invalid date')
	}),
	pauseDateEnd: z.date({
		error: (issue) => (issue.input === undefined ? 'Required' : 'Invalid date')
	})
});
