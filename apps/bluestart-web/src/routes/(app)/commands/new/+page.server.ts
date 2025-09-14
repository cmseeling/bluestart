import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { schema } from '@bluestart/database';
import { CommandType } from '@bluestart/database/enums.js';
import type { UpsertCommand, UpsertCommandSettings } from '@bluestart/database/types.js';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger, LogLevel } from '@bluestart/shared/ConsoleLogger';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { newCommandSchema } from '../validationSchema.js';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);
logger.setLogLevel(LogLevel.DEBUG);

export const actions = {
	default: async ({ request }: RequestEvent) => {
		logger.info('handling new command form action');
		const formData = await request.formData();
		const formValues = Object.fromEntries(formData);
		const commandValues = newCommandSchema.safeParse(formValues);
		logger.debug(commandValues);

		if (!commandValues.success) {
			const errors: Map<string, string> = commandValues.error.issues.reduce((acc, error) => {
				acc.set(error.path[0].toString(), error.message);
				return acc;
			}, new Map<string, string>());
			logger.error(errors);

			return fail(400, { errors });
		}

		const newCommandId = randomUUID();
		const newCommand: UpsertCommand = {
			id: newCommandId,
			name: commandValues.data.name,
			day: 1,
			activationTime: commandValues.data.time
		};

		const newCommandSettings: UpsertCommandSettings = {
			commandId: newCommandId,
			commandType: CommandType.Climate,
			tempAbove:
				commandValues.data.thresholdType === 'above' ? commandValues.data.externalTemp : null,
			tempBelow:
				commandValues.data.thresholdType === 'below' ? commandValues.data.externalTemp : null,
			hvacTemp: commandValues.data.hvacTemp,
			defrost: commandValues.data.defrost,
			heatedFeatures: commandValues.data.heatedSeats
		};

		try {
			const commandResult = await db.insert(schema.commandTable).values(newCommand);
			const settingsResult = await db
				.insert(schema.commandSettingsTable)
				.values(newCommandSettings);

			logger.debug('db results:', commandResult, settingsResult);
		} catch (error) {
			logger.error(error);
			return fail(500, { error: { message: 'There was an error saving the command.' } });
		}

		return redirect(303, `/commands/${newCommandId}?created=success`);
	}
};
