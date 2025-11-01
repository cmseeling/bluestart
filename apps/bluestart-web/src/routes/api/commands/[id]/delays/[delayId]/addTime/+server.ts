import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { eq, schema } from '@bluestart/database';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger(
	'bluestart-web.api.commands.delays.addTime',
	dotenvConfig.logLevel
);
// logger.setLogLevel(LogLevel.DEBUG);

const zNumber = z
	.number()
	.min(0)
	.max(60 * 24);

export const PUT: RequestHandler = async ({ params, request }) => {
	if (params.id === undefined) {
		return error(400, 'Invalid command ID');
	}
	if (params.delayId === undefined) {
		return error(400, 'Invalid delay ID');
	}

	const { delay } = await request.json();
	const parsedDelay = zNumber.safeParse(delay);

	if (!parsedDelay.success) {
		return error(400, 'Invalid delay');
	}

	const delayEntry = await db.query.commandDelayTable.findFirst({
		where: eq(schema.commandDelayTable.id, params.delayId)
	});
	logger.debug(delayEntry);

	if (delayEntry === undefined) {
		return error(404, 'Delay not found');
	}

	try {
		const result = await db
			.update(schema.commandDelayTable)
			.set({ delay: delayEntry.delay + parsedDelay.data })
			.where(eq(schema.commandDelayTable.id, params.delayId));

		logger.debug('db results:', result);

		return json({ success: true });
	} catch (err) {
		logger.error(err);
		return error(500, 'There was an error saving the delay');
	}
};
