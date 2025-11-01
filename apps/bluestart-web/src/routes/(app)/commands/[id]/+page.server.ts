import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db/index.js';
import { eq, schema } from '@bluestart/database';
import { CommandType } from '@bluestart/database/enums.js';
import type { UpsertCommand, UpsertCommandSettings } from '@bluestart/database/types.js';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import {
	ConsoleLogger
	// LogLevel
} from '@bluestart/shared/ConsoleLogger';
import { fail, type RequestEvent } from '@sveltejs/kit';
import type { FormData } from '../FormData.js';
import { updateCommandSchema } from '../validationSchema.js';
import type { PageServerLoad } from './$types.js';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.commands.id', dotenvConfig.logLevel);
// logger.setLogLevel(LogLevel.DEBUG);

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
			command?.settings?.tempAbove === null || command?.settings?.tempAbove === undefined
				? 'below'
				: 'above',
		externalTemp: command?.settings?.tempAbove ?? command?.settings?.tempBelow ?? 0,
		hvacTemp: command?.settings?.hvacTemp,
		defrost: command?.settings?.defrost || false,
		heatedSeats: command?.settings?.heatedFeatures || false
	};

	return { formValues, enabled: !(command?.isDisabled || false) };
};

export const actions = {
	default: async ({ request }: RequestEvent) => {
		logger.info('handling edit command form action');
		const formData = await request.formData();
		logger.debug(formData);
		const formValues = Object.fromEntries(formData);
		const commandValues = updateCommandSchema.safeParse(formValues);
		logger.debug(commandValues);

		if (!commandValues.success) {
			const errors: Map<string, string> = commandValues.error.issues.reduce((acc, error) => {
				acc.set(error.path[0].toString(), error.message);
				return acc;
			}, new Map<string, string>());
			logger.error(errors);

			return fail(400, { errors });
		}

		const editCommand: UpsertCommand = {
			id: commandValues.data.id,
			name: commandValues.data.name,
			day: 1,
			activationTime: commandValues.data.time
		};

		const editCommandSettings: UpsertCommandSettings = {
			commandId: commandValues.data.id,
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
			const commandResult = await db
				.update(schema.commandTable)
				.set(editCommand)
				.where(eq(schema.commandTable.id, commandValues.data.id));
			const settingsResult = await db
				.update(schema.commandSettingsTable)
				.set(editCommandSettings)
				.where(eq(schema.commandSettingsTable.commandId, commandValues.data.id));

			logger.debug('db results:', commandResult, settingsResult);
		} catch (error) {
			logger.error(error);
			return fail(500, { error: { message: 'There was an error saving the command.' } });
		}

		return { success: true, formValues };
	}
};
