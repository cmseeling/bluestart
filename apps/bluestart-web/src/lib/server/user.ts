import { db } from '@bluestart/db';
import { hashPassword } from './password';
import type { User } from '@bluestart/db/schemaTypes';
import { userTable } from '@bluestart/db/schema';
import { eq } from 'drizzle-orm';

export function verifyUsernameInput(username: string): boolean {
	return username.length > 3 && username.length < 32 && username.trim() === username;
}

export async function createUser(username: string, password: string): Promise<User> {
	const passwordHash = await hashPassword(password);

	const user: User = {
		id: crypto.randomUUID(),
		isMasterAccount: true,
		username,
		passwordHash,
		forcePasswordChange: false
	}
	const result = await db.insert(userTable).values(user);
	if(result.changes === 0) {
		throw new Error("Unexpected error");
	}

	return user;
}

export async function getUserByName(userName: string): Promise<User> {
	const user = await db.query.userTable.findFirst({
		where: eq(userTable.username, userName)
	});

	if(user === null || user === undefined) {
		throw new Error("Invalid user name");
	}

	return user;
}

export async function getUserPasswordHash(userName: string): Promise<string> {
	const user = await db.query.userTable.findFirst({
		where: eq(userTable.username, userName)
	});

	if(user === null || user === undefined) {
		throw new Error("Invalid user ID");
	}

	return user.passwordHash;
}
