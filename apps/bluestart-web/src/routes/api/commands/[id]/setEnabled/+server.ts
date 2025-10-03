import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { eq, schema } from '@bluestart/database';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);
// logger.setLogLevel(LogLevel.DEBUG);

const zBoolean = z.boolean();

export const PUT: RequestHandler = async ({ params, request }) => {
	if (params.id === undefined) {
		return error(400, 'Invalid command ID');
	}

	const command = await db.query.commandTable.findFirst({
		where: eq(schema.commandTable.id, params.id),
		with: {
			settings: true
		}
	});
	logger.debug(command);

	if (command === undefined) {
		return error(404, 'Command not found');
	}

	const { enabled } = await request.json();
	const parsedEnabled = zBoolean.safeParse(enabled);
	if (!parsedEnabled.success) {
		return error(400, 'Invalid enabled value');
	}

	try {
		const commandResult = await db
			.update(schema.commandTable)
			.set({ isDisabled: !parsedEnabled.data })
			.where(eq(schema.commandTable.id, command.id));

		logger.debug('db results:', commandResult);

		return json({ success: true });
	} catch (err) {
		logger.error(err);
		return error(500, 'There was an error saving the command.');
	}
};
