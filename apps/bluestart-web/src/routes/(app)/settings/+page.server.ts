import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { eq, schema } from '@bluestart/database';
import type { Geolocation, LocationConfiguration } from '@bluestart/database/types';
import { getGeocoding } from '@bluestart/geocode-client';
import { dotenvConfigSchema } from '@bluestart/shared/config';
import { ConsoleLogger } from '@bluestart/shared/ConsoleLogger';
import type { WeatherClientConfig } from '@bluestart/weather-client';
import { fail, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import settingsSchema from './validationSchema';

const dotenvConfig = dotenvConfigSchema.parse(env);

const logger = new ConsoleLogger('bluestart-web.settings', dotenvConfig.logLevel);

type FormValues = {
	location: string;
	geolocation?: Geolocation;
	temperatureUnits: string;
	precipitationUnits: string;
};

export const load: PageServerLoad = async () => {
	logger.info('loading existing settings');
	const settings = await db.query.configurationTable.findMany();
	const location = settings.find((setting) => setting.key == 'location');
	const units = settings.find((setting) => setting.key == 'weatherUnits');
	logger.debug('', location, units);

	const formValues: FormValues = {
		location: '',
		geolocation: undefined,
		temperatureUnits: '',
		precipitationUnits: ''
	};

	if (location) {
		const parsedLocation: LocationConfiguration = JSON.parse(location.value);
		formValues.location = parsedLocation.address;
		formValues.geolocation = parsedLocation.geolocation;
	}
	if (units) {
		const parsedUnits: WeatherClientConfig = JSON.parse(units.value);
		formValues.temperatureUnits = parsedUnits.temperature_unit;
		formValues.precipitationUnits = parsedUnits.precipitation_unit;
	}

	return { formValues };
};

export const actions = {
	default: async (event: RequestEvent) => {
		logger.info('handling settings form action');
		const { request } = event;
		const formData = Object.fromEntries(await request.formData());
		logger.debug(formData);
		const settingsValues = settingsSchema.safeParse(formData);
		logger.debug(settingsValues);

		if (!settingsValues.success) {
			const errors: Map<string, string> = settingsValues.error.issues.reduce((acc, error) => {
				acc.set(error.path[0].toString(), error.message);
				return acc;
			}, new Map<string, string>());
			logger.error(errors);

			return fail(400, { errors });
		}

		const settings = await db.query.configurationTable.findMany();

		const locationData: LocationConfiguration = {
			address: settingsValues.data.location
		};

		try {
			const geocodingResponse = await getGeocoding(settingsValues.data.location);
			locationData.geolocation = {
				latitude: parseFloat(geocodingResponse[0].lat),
				longitude: parseFloat(geocodingResponse[0].lon)
			};
		} catch (error) {
			logger.error(error);
			return fail(500, { error: { message: 'There was an error geocoding the location' } });
		}

		try {
			if (settings.find((setting) => setting.key === 'location')) {
				const locationUpdateResult = await db
					.update(schema.configurationTable)
					.set({ value: JSON.stringify(locationData) })
					.where(eq(schema.configurationTable.key, 'location'));
				logger.debug(locationUpdateResult);
			} else {
				const locationInsertResult = await db.insert(schema.configurationTable).values({
					key: 'location',
					value: JSON.stringify(locationData)
				});
				logger.debug(locationInsertResult);
			}
		} catch (error) {
			logger.error(error);
			return fail(500, { error: { message: 'There was an error saving the location' } });
		}

		// save units
		const unitSettings: WeatherClientConfig = {
			temperature_unit: settingsValues.data.temperatureUnits,
			precipitation_unit: settingsValues.data.precipitationUnits
		};

		try {
			if (settings.find((setting) => setting.key === 'weatherUnits')) {
				const unitUpdateResult = await db
					.update(schema.configurationTable)
					.set({ value: JSON.stringify(unitSettings) })
					.where(eq(schema.configurationTable.key, 'weatherUnits'));
				logger.debug(unitUpdateResult);
			} else {
				const unitInsertResult = await db.insert(schema.configurationTable).values({
					key: 'weatherUnits',
					value: JSON.stringify(unitSettings)
				});
				logger.debug(unitInsertResult);
			}
		} catch (error) {
			logger.error(error);
			return fail(500, { error: { message: 'There was an error saving the units' } });
		}

		const formValues: FormValues = {
			location: locationData.address,
			geolocation: locationData.geolocation,
			temperatureUnits: unitSettings.temperature_unit,
			precipitationUnits: unitSettings.precipitation_unit
		};

		return { success: true, formValues };
	}
};
