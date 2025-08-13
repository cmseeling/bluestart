import { fetchWeatherApi } from 'openmeteo';
import { OPEN_METEO_API_URL } from './constants';
import { CurrentConditions } from './CurrentConditions';
import { DailyForecast } from './DailyForecast';

export const getCurrentWeather = async (lat: number, lon: number) => {
  const params = {
    latitude: [lat],
    longitude: [lon],
    current: 'temperature_2m,weather_code,precipitation,rain,showers,snowfall,is_day',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    format: 'json'
  };

  const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);
  const response = responses[0];
  const current = response.current();

  const currentConditions: CurrentConditions = {
    time: new Date(Number(current.time()) * 1000),
    temperature: current.variables(0).value(),
    weatherCode: current.variables(1).value(),
    precipitation: current.variables(2).value(),
    rain: current.variables(3).value(),
    showers: current.variables(4).value(),
    snowfall: current.variables(5).value(),
    isDay: current.variables(6).value() === 1
  };

  return currentConditions;
};

const range = (from: number, to: number, step = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

export const getDailyForecasts = async (lat: number, lon: number) => {
  const params = {
    latitude: [lat],
    longitude: [lon],
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum,showers_sum,snowfall_sum',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    format: 'json'
  };

  const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);
  const response = responses[0];
  const daily = response.daily();

  const valueArrays = {
    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
      (t: number) => new Date(t * 1000)
    ),
    weatherCode: daily.variables(0)!.valuesArray()!,
    temperatureMax: daily.variables(1)!.valuesArray()!,
    temperatureMin: daily.variables(2)!.valuesArray()!,
    precipitationProbabilityMax: daily.variables(3)!.valuesArray()!,
    rainSum: daily.variables(4)!.valuesArray()!,
    showersSum: daily.variables(5)!.valuesArray()!,
    snowfallSum: daily.variables(6)!.valuesArray()!
  };

  const forecasts: DailyForecast[] = [];
  for (let i = 0; i < valueArrays.time.length - 1; i++) {
    const time = valueArrays.time[i];
    const weatherCode = valueArrays.weatherCode[i];
    const maxTemp = valueArrays.temperatureMax[i];
    const minTemp = valueArrays.temperatureMin[i];
    const precipitationProbability = valueArrays.precipitationProbabilityMax[i];
    const rainSum = valueArrays.rainSum[i];
    const showersSum = valueArrays.showersSum[i];
    const snowSum = valueArrays.snowfallSum[i];

    forecasts.push({
      time,
      weatherCode,
      maxTemp,
      minTemp,
      precipitationProbability,
      rainSum,
      showersSum,
      snowSum
    });
  }

  return forecasts;
};
