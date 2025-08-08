import { error, json, type RequestHandler } from '@sveltejs/kit';
// import { SchedledCommandWithIdSchema, ScheduledCommandSchema, TestCommand } from '@bluestart/data';
import { db } from '$lib/server/db';
import { commands } from '@bluestart/database/schema';
import { getForecast } from '@bluestart/weather-api';

import * as currEnv from '$env/static/private';

export const GET: RequestHandler = async (event) => {
	// const results = await db.select().from(commands);

	const results = await db.query.commands.findMany({
		with: {
			settings: {
				with: {
					location: true
				}
			},
			pauseDates: true,
			delays: true
		}
	});

	// const results = await db.query.commandSettings.findMany({
	// 	with: {
	// 		locations: true
	// 	}
	// })

	// return json({
	// 	dayName: event.params.day,
	// 	triggers: [
	// 		{
	// 			time: '7:30 AM',
	// 			timeOffset: '-0:10',
	// 			tempThreshold: 25,
	// 			tempAboveBelow: 'below',
	// 			tempUnits: 'F'
	// 		}
	// 	]
	// });

	return json(results);
};

// export const POST: RequestHandler = async (event) => {
// 	const raw = await event.request.json();
// 	const parsed = ScheduledCommandSchema.safeParse(raw);
// 	if (parsed.success) {
// 		const {
// 			activationTime,
// 			outdoorTemp,
// 			tempAboveBelow,
// 			tempUnits,
// 			location,
// 			hvacTemp,
// 			defrost,
// 			heatedFeatures
// 		} = parsed.data;
// 		return json({
// 			success: true,
// 			data: {
// 				activationTime,
// 				outdoorTemp,
// 				tempAboveBelow,
// 				tempUnits,
// 				location,
// 				hvacTemp,
// 				defrost,
// 				heatedFeatures
// 			}
// 		});
// 	} else {
// 		error(400, parsed.error);
// 	}
// };

// export const PUT: RequestHandler = async (event) => {
// 	const raw = await event.request.json();
// 	const parsed = SchedledCommandWithIdSchema.safeParse(raw);
// 	if (parsed.success) {
// 		const {
// 			id,
// 			activationTime,
// 			outdoorTemp,
// 			tempAboveBelow,
// 			tempUnits,
// 			location,
// 			hvacTemp,
// 			defrost,
// 			heatedFeatures
// 		} = parsed.data;
// 		return json({
// 			success: true,
// 			data: {
// 				id,
// 				activationTime,
// 				outdoorTemp,
// 				tempAboveBelow,
// 				tempUnits,
// 				location,
// 				hvacTemp,
// 				defrost,
// 				heatedFeatures
// 			}
// 		});
// 	} else {
// 		error(400, parsed.error);
// 	}
// };
