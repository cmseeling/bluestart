import { z } from 'zod';

export const usernameSchema = z.string().trim().max(32).min(1, 'Username cannot be empty.');

export const passwordSchema = z.string().min(1, 'Incorrect password.');
