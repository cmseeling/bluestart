import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { schema } from '@bluestart/database';
import type { UpsertPauseRange } from '@bluestart/database/types';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { formatISO } from 'date-fns';
import { pauseSchema } from '../validationSchema';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.api.commands.pauses.add', dotenvConfig.logLevel);
// logger.setLogLevel(LogLevel.DEBUG);

export const POST: RequestHandler = async ({ params, request }) => {
	if (params.id === undefined) {
		return error(400, 'Invalid command ID');
	}

	const formData = await request.formData();
	const formValues = Object.fromEntries(formData);
	const pauseRange = pauseSchema.safeParse(formValues);

	if (!pauseRange.success) {
		const errors: Map<string, string> = pauseRange.error.issues.reduce((acc, error) => {
			acc.set(error.path[0].toString(), error.message);
			return acc;
		}, new Map<string, string>());
		logger.error(errors);

		return error(400, JSON.stringify({ message: 'Invalid Pause Range', errors }));
	}

	const newPauseRange: UpsertPauseRange = {
		commandId: params.id,
		pauseDateStart: formatISO(pauseRange.data.pauseDateStart, { representation: 'date' }),
		pauseDateEnd: formatISO(pauseRange.data.pauseDateEnd, { representation: 'date' })
	};

	try {
		const result = await db.insert(schema.pauseRangeTable).values(newPauseRange);

		logger.debug('db results:', result);

		return json({ success: true });
	} catch (err) {
		logger.error(err);
		return error(500, 'There was an error saving the pause range');
	}
};
