import { env } from '$env/dynamic/private';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger, LogLevel } from '@bluestart/shared/ConsoleLogger';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { newCommandSchema } from '../validationSchema.js';
import { randomUUID } from 'crypto';
import type { UpsertCommand, UpsertCommandSettings } from '@bluestart/database/types.js';
import { db } from '$lib/server/db/index.js';
import { eq, schema } from '@bluestart/database';
import { CommandType } from '@bluestart/database/enums.js';
import type { FormData } from '../FormData.js';
import type { PageServerLoad } from './$types.js';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.login', dotenvConfig.logLevel);
logger.setLogLevel(LogLevel.DEBUG);

export const load: PageServerLoad = async ({ params }) => {
	const command = await db.query.commandTable.findFirst({
		where: eq(schema.commandTable.id, params.id),
		with: {
			settings: true
		}
	});
	logger.debug(command);

	const formValues: FormData = {
		id: command?.id,
		name: command?.name,
		day: command?.day,
		time: command?.activationTime,
		thresholdType:
			command?.settings?.tempAbove !== null || command?.settings?.tempAbove !== undefined
				? 'above'
				: 'below',
		externalTemp: command?.settings?.tempAbove ?? command?.settings?.tempBelow ?? 0,
		hvacTemp: command?.settings?.hvacTemp,
		defrost: command?.settings?.defrost || false,
		heatedSeats: command?.settings?.heatedFeatures || false
	};

	return { formValues };
};

export const actions = {
	default: async ({ request }: RequestEvent) => {
		logger.info('handling new command form action');
		const formData = await request.formData();
		const formValues = Object.fromEntries(formData);
		const commandValues = newCommandSchema.safeParse(formValues);
		// logger.debug(commandValues);
		// logger.debug(formData);
		// logger.debug(formData.get('day'));
		// logger.debug(formData.get('thresholdType'));
		// logger.debug(formData.get('hvacTemp'));
		// logger.debug(formData.get('defrost'));
		// logger.debug(formData.get('heatedSeats'));

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
		// const commandResult = await db.insert(schema.commandTable).values(newCommand);
		// if (commandResult.changes === 0) {
		// 	console.log('Command not created. Check DB for existing entry');
		// }

		const newCommandSettings: UpsertCommandSettings = {
			commandId: newCommandId,
			commandType: CommandType.Climate,
			tempBelow: 25,
			hvacTemp: commandValues.data.hvacTemp,
			defrost: commandValues.data.defrost,
			heatedFeatures: commandValues.data.heatedSeats
		};
		// const settingsResult = await db.insert(schema.commandSettingsTable).values(newCommandSettings);
		// if (settingsResult.changes === 0) {
		// 	console.log('Command settings not created. Check DB for existing entry');
		// }

		const rowsUpdated: number = await db.transaction(async (tx) => {
			const commandResult = await tx.insert(schema.commandTable).values(newCommand);
			const settingsResult = await tx
				.insert(schema.commandSettingsTable)
				.values(newCommandSettings);

			return commandResult.changes + settingsResult.changes;
		});
		logger.debug(rowsUpdated);

		const returnFormValues: FormData = {
			id: newCommandId,
			name: commandValues.data.name,
			day: commandValues.data.day === null ? undefined : commandValues.data.day,
			time: commandValues.data.time,
			hvacTemp: commandValues.data.hvacTemp,
			defrost: commandValues.data.defrost,
			heatedSeats: commandValues.data.heatedSeats
		};

		return { success: true, formValues: returnFormValues };
	}
};
