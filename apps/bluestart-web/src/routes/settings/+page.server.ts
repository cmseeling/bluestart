import { env } from '$env/dynamic/private';
import { ConsoleLogger, LogLevel } from '@bluestart/shared/ConsoleLogger';
import { fail, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import settingsSchema from './validationSchema';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { db } from '$lib/server/db';
import type { LocationConfiguration } from '@bluestart/database/types';
import type { WeatherClientConfig } from '@bluestart/weather-client';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.settings', dotenvConfig.logLevel);

export const load: PageServerLoad = async () => {
	logger.info('loading existing settings');
	const settings = await db.query.configurationTable.findMany();
	const location = settings.find((setting) => setting.key == 'location');
	const units = settings.find((setting) => setting.key == 'weatherUnits');
	logger.debug(location, units);

	let formValueLocation = null;
	let formValueTemperatureUnits = null;
	let formValuePrecipitationUnits = null;

	if (location) {
		const parsedLocation: LocationConfiguration = JSON.parse(location.value);
		formValueLocation = parsedLocation.address;
	}

	if (units) {
		const parsedUnits: WeatherClientConfig = JSON.parse(units.value);
		formValueTemperatureUnits = parsedUnits.temperature_unit;
		formValuePrecipitationUnits = parsedUnits.precipitation_unit;
	}

	// logger.debug(
	// 	'Form values: ',
	// 	formValueLocation,
	// 	formValueTemperatureUnits,
	// 	formValuePrecipitationUnits
	// );

	return {
		form: {
			errors: undefined,
			formValues: {
				location: formValueLocation,
				temperatureUnits: formValueTemperatureUnits,
				precipitationUnits: formValuePrecipitationUnits
			}
		}
	};
};

export const actions = {
	default: async (event: RequestEvent) => {
		logger.info('handling settings form action');
		const { request } = event;
		const formData = Object.fromEntries(await request.formData());
		const settings = settingsSchema.safeParse(formData);
		logger.debug(settings);

		if (!settings.success) {
			const errors: Map<string, string> = settings.error.issues.reduce((acc, error) => {
				acc.set(error.path[0].toString(), error.message);
				return acc;
			}, new Map<string, string>());
			logger.info(errors);

			return fail(400, {
				form: {
					errors,
					formValues: { location: null, temperatureUnits: null, precipitationUnits: null }
				}
			});
		}
	}
};
