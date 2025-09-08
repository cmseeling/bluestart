import { env } from '$env/dynamic/private';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { newCommandSchema } from '../validationSchema.js';
import { randomUUID } from 'crypto';
import type { UpsertCommand, UpsertCommandSettings } from '@bluestart/database/types.js';
import { db } from '$lib/server/db/index.js';
import { schema } from '@bluestart/database';
import { CommandType } from '@bluestart/database/enums.js';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);

export const actions = {
	default: async ({ request }: RequestEvent) => {
		logger.info('handling new command form action');
		const formData = Object.fromEntries(await request.formData());
		const commandValues = newCommandSchema.safeParse(formData);
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
		const commandResult = await db.insert(schema.commandTable).values(newCommand);
		if (commandResult.changes === 0) {
			console.log('Command not created. Check DB for existing entry');
		}

		const newCommandSettings: UpsertCommandSettings = {
			commandId: newCommandId,
			commandType: CommandType.Climate,
			tempBelow: 25,
			hvacTemp: commandValues.data.hvacTemp,
			defrost: commandValues.data.defrost,
			heatedFeatures: commandValues.data.heatedSeats
		};
		const settingsResult = await db.insert(schema.commandSettingsTable).values(newCommandSettings);
		if (settingsResult.changes === 0) {
			console.log('Command settings not created. Check DB for existing entry');
		}
	}
};
