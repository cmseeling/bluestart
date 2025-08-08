import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { createUser } from '$lib/server/user';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { verifyPasswordStrength } from '$lib/server/password';
import { userTable } from '@bluestart/database/schema';

export const load: PageServerLoad = async () => {
	console.log('handling createmasteraccount page request');
	const masterAccount = await db.query.userTable.findFirst({
		where: eq(userTable.isMasterAccount, true)
	});
	if (masterAccount !== null && masterAccount !== undefined) {
		return redirect(303, '/');
	}
};

export const actions = {
	default: async (event: RequestEvent) => {
		const masterAccount = await db.query.userTable.findFirst({
			where: eq(userTable.isMasterAccount, true)
		});
		if (masterAccount !== null && masterAccount !== undefined) {
			return fail(422);
		}

		const { request } = event;
		const formData = await request.formData();
		console.log(formData);

		let hasErrors = false;
		const errors = {
			username: false,
			passwordGeneric: false,
			passwordStrength: false
		};

		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

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
			errors.passwordGeneric = true;
		}
		if (confirmPassword !== password) {
			hasErrors = true;
			errors.passwordGeneric = true;
		}

		if (!verifyPasswordStrength(password as string)) {
			hasErrors = true;
			errors.passwordStrength = true;
		}

		if (hasErrors) {
			return fail(400, {
				errors,
				formValues: { username }
			});
		}

		const user = await createUser(username as string, password as string);
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return { success: true };
	}
};
