import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { schema } from '@bluestart/database';
import type { UpsertCommandDelay } from '@bluestart/database/types';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { formatISO } from 'date-fns';
import { z } from 'zod';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);
// logger.setLogLevel(LogLevel.DEBUG);

const zNumber = z
	.number()
	.min(0)
	.max(60 * 24);

export const POST: RequestHandler = async ({ params, request }) => {
	if (params.id === undefined) {
		return error(400, 'Invalid command ID');
	}

	const { delay } = await request.json();
	const parsedDelay = zNumber.safeParse(delay);

	if (!parsedDelay.success) {
		return error(400, 'Invalid delay');
	}

	const dateString = formatISO(new Date(), { representation: 'date' });

	const newDelay: UpsertCommandDelay = {
		commandId: params.id,
		date: dateString,
		delay: parsedDelay.data
	};

	try {
		const result = await db.insert(schema.commandDelayTable).values(newDelay);

		logger.debug('db results:', result);

		return json({ success: true });
	} catch (err) {
		logger.error(err);
		return error(500, 'There was an error saving the delay');
	}
};
