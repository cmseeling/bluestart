import { error, json, type RequestHandler } from '@sveltejs/kit';
import { TriggerSchema } from '@repo/data';

export const GET: RequestHandler = async (event) => {
	return json({
		dayName: event.params.day,
		triggers: [
			{
				time: '7:30 AM',
				timeOffset: '-0:10',
				tempThreshold: 25,
				tempAboveBelow: 'below',
				tempUnits: 'F'
			}
		]
	});
};

export const POST: RequestHandler = async (event) => {
	const raw = await event.request.json();
    const parsed = TriggerSchema.safeParse(raw);
    if(parsed.success) {
        const { time, timeOffset, tempThreshold, tempAboveBelow, tempUnits } = parsed.data;
        return json({ success: true, time, timeOffset, tempThreshold, tempAboveBelow, tempUnits });
    }
    else {
        error(400, parsed.error);
    }
};
