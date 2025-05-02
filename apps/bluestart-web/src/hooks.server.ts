import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from "$lib/server/session";

import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	console.log(`server hook running on route ${event.route.id}`);
	if(event.route.id?.includes("login") || event.route.id?.includes("admin/createmasteraccount")) {
		return resolve(event);
	}

	const token = event.cookies.get("session") ?? null;
	console.log(token);
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return redirect(303, '/login');
	}

	const { session, user } = await validateSessionToken(token);
	console.log(session);
	console.log(user);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
		return redirect(303, '/login');
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};
