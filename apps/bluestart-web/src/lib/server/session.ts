import type { Session, User } from '@bluestart/data';
import { schema } from '@bluestart/data';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from './db';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(schema.sessionTable).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: schema.userTable, session: schema.sessionTable })
		.from(schema.sessionTable)
		.innerJoin(schema.userTable, eq(schema.sessionTable.userId, schema.userTable.id))
		.where(eq(schema.sessionTable.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(schema.sessionTable).where(eq(schema.sessionTable.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(schema.sessionTable)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(schema.sessionTable.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(schema.sessionTable).where(eq(schema.sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: string): Promise<void> {
	await db.delete(schema.sessionTable).where(eq(schema.sessionTable.userId, userId));
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
