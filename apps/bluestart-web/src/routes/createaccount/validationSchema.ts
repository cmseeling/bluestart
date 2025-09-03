import { z } from 'zod';

export const usernameSchema = z.string().trim().max(32).min(1, 'Username cannot be empty.');

export const passwordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters long.'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters long.')
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match.',
				path: ['confirmPassword']
			});
		}
	});
