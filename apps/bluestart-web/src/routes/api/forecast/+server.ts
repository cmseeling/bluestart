import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getForecast } from '@bluestart/weather-api';

// import * as currEnv from '$env/static/private';

export const GET: RequestHandler = async (event) => {

    const results = await getForecast('minneapolis');
    console.log(results);

    return json(results);
};