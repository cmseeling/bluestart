import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as schema from '@bluestart/database/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { verifyPasswordHash } from '$lib/server/password';
import { getUserByName } from '$lib/server/user';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = async () => {
	console.log('handling login page request');
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

		const username = formData.get('username');
		const password = formData.get('password');

		let hasErrors = false;
		const errors = {
			username: false,
			password: false
		};

		if (
			typeof username !== 'string' ||
			username === null ||
			username === undefined ||
			username === ''
		) {
			hasErrors = true;
			errors.username = true;
		}
		if (
			typeof password !== 'string' ||
			password === null ||
			password === undefined ||
			password === ''
		) {
			hasErrors = true;
			errors.password = true;
		}

		const user = await getUserByName(username as string);
		const validPassword = await verifyPasswordHash(user.passwordHash, password as string);
		if (!validPassword) {
			hasErrors = true;
			errors.password = true;
		}

		if (hasErrors) {
			return fail(400, {
				errors,
				formValues: { username }
			});
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	}
};
