import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { verifyPasswordStrength } from '$lib/server/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { createUser } from '$lib/server/user';
import { count } from '@bluestart/database';
import { userTable } from '@bluestart/database/schema';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { passwordSchema, usernameSchema } from './validationSchema';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.settings', dotenvConfig.logLevel);

export const load: PageServerLoad = async () => {
	logger.info('handling createaccount page request');
	const userCount = await db.select({ count: count() }).from(userTable);
	logger.debug(userCount);
	if (userCount[0].count > 0) {
		return redirect(303, '/');
	}
};

export const actions = {
	default: async (event: RequestEvent) => {
		const { request } = event;
		const formData = await request.formData();
		logger.debug(formData);
		const parsedUsername = usernameSchema.safeParse(formData.get('username'));
		const passwordValidation = passwordSchema.safeParse(Object.fromEntries(formData));
		logger.debug('validators:', parsedUsername, passwordValidation);

		if (parsedUsername.success && passwordValidation.success) {
			if (!verifyPasswordStrength(passwordValidation.data.password)) {
				const errors = new Map<string, string>();
				errors.set('password', 'Password must be greater than 8 characters.');

				return fail(400, {
					errors,
					formValues: { username: parsedUsername.data }
				});
			}

			const user = await createUser(parsedUsername.data, passwordValidation.data.password);
			const sessionToken = generateSessionToken();
			const session = await createSession(sessionToken, user.id);
			setSessionTokenCookie(event, sessionToken, session.expiresAt);

			return { success: true };
		} else {
			let errors = new Map<string, string>();
			if (!parsedUsername.success) {
				errors.set('username', parsedUsername.error.issues[0].message);
			}
			if (!passwordValidation.success) {
				errors = passwordValidation.error.issues.reduce((acc, error) => {
					acc.set(error.path[0].toString(), error.message);
					return acc;
				}, errors);
			}

			return fail(400, {
				errors,
				formValues: { username: parsedUsername.data }
			});
		}
	}
};
