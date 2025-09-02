import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { verifyPasswordHash } from '$lib/server/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { getUserByName } from '$lib/server/user';
import { eq } from '@bluestart/database';
import * as schema from '@bluestart/database/schema';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { passwordSchema, usernameSchema } from './validationSchema';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);

export const load: PageServerLoad = async () => {
	logger.info('handling login page request');
	const masterAccount = await db.query.userTable.findFirst({
		where: eq(schema.userTable.isMasterAccount, true)
	});
	if (masterAccount === null || masterAccount === undefined) {
		return redirect(303, '/admin/createmasteraccount');
	}
};

export const actions = {
	default: async (event: RequestEvent) => {
		const { request } = event;
		const formData = await request.formData();
		const parsedUsername = usernameSchema.safeParse(formData.get('username'));
		const parsedPassword = passwordSchema.safeParse(formData.get('password'));
		logger.debug('', parsedUsername, parsedPassword);

		const errors = new Map<string, string>();

		if (parsedUsername.success && parsedPassword.success) {
			const user = await getUserByName(parsedUsername.data);
			const validPassword = await verifyPasswordHash(user.passwordHash, parsedPassword.data);
			if (!validPassword) {
				errors.set('password', 'Incorrect password');
			} else {
				const sessionToken = generateSessionToken();
				const session = await createSession(sessionToken, user.id);
				setSessionTokenCookie(event, sessionToken, session.expiresAt);
				return redirect(302, '/');
			}
		} else {
			if (!parsedUsername.success) {
				errors.set('username', parsedUsername.error.issues[0].message);
			}
			if (!parsedPassword.success) {
				errors.set('password', parsedPassword.error.issues[0].message);
			}
		}

		if (errors.size > 0) {
			return fail(400, {
				errors,
				formValues: { username: parsedUsername.data }
			});
		}
	}
};
