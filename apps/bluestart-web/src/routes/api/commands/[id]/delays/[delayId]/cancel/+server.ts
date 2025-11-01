import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { eq, schema } from '@bluestart/database';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { error, json, type RequestHandler } from '@sveltejs/kit';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.api.commands.delays.cancel', dotenvConfig.logLevel);
// logger.setLogLevel(LogLevel.DEBUG);

export const DELETE: RequestHandler = async ({ params }) => {
	if (params.id === undefined) {
		return error(400, 'Invalid command ID');
	}
	if (params.delayId === undefined) {
		return error(400, 'Invalid delay ID');
	}

	try {
		const result = await db
			.delete(schema.commandDelayTable)
			.where(eq(schema.commandDelayTable.id, params.delayId));

		logger.debug('db results:', result);

		return json({ success: true });
	} catch (err) {
		logger.error(err);
		return error(500, 'There was an error deleting the delay');
	}
};
