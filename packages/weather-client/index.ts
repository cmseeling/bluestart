import { fetchWeatherApi } from 'openmeteo';
import { OPEN_METEO_API_URL } from './constants';
import { CurrentConditions } from './CurrentConditions';
import { DailyForecast } from './DailyForecast';
import { UnitToAbbr } from './UnitToAbbr';

export type WeatherClientConfig = {
  temperature_unit: 'fahrenheit' | 'celsius';
  precipitation_unit: 'inch' | 'mm';
};

export const US_Unit_Config: WeatherClientConfig = {
  temperature_unit: 'fahrenheit',
  precipitation_unit: 'inch'
};

export const Metric_Unit_Config: WeatherClientConfig = {
  temperature_unit: 'celsius',
  precipitation_unit: 'mm'
};

export const getCurrentWeather = async (lat: number, lon: number, config: WeatherClientConfig) => {
  const params = {
    latitude: [lat],
    longitude: [lon],
    current: 'temperature_2m,weather_code,precipitation,rain,showers,snowfall,is_day',
    format: 'json',
    ...config
  };

  const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);
  const response = responses[0];
  const current = response.current();

  const currentConditions: CurrentConditions = {
    time: new Date(Number(current.time()) * 1000),
    temperature: current.variables(0).value(),
    temperatureUnitAbbreviation: UnitToAbbr(current.variables(0).unit()),
    weatherCode: current.variables(1).value(),
    precipitation: current.variables(2).value(),
    precipitationUnitAbbreviation: UnitToAbbr(current.variables(2).unit()),
    rain: current.variables(3).value(),
    rainUnitAbbreviation: UnitToAbbr(current.variables(3).unit()),
    showers: current.variables(4).value(),
    showersUnitAbbreviation: UnitToAbbr(current.variables(4).unit()),
    snowfall: current.variables(5).value(),
    snowfallUnitAbbreviation: UnitToAbbr(current.variables(5).unit()),
    isDay: current.variables(6).value() === 1
  };

  return currentConditions;
};

const range = (from: number, to: number, step = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

export const getDailyForecasts = async (lat: number, lon: number, config: WeatherClientConfig) => {
  const params = {
    latitude: [lat],
    longitude: [lon],
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum,showers_sum,snowfall_sum',
    format: 'json',
    ...config
  };

  const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);
  const response = responses[0];
  const daily = response.daily();

  const tempUnitAbbreviation = UnitToAbbr(daily.variables(1).unit());
  const rainUnitAbbreviation = UnitToAbbr(daily.variables(4).unit());
  const showersUnitAbbreviation = UnitToAbbr(daily.variables(5).unit());
  const snowUnitAbbreviation = UnitToAbbr(daily.variables(6).unit());

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
      tempUnitAbbreviation,
      precipitationProbability,
      rainSum,
      rainUnitAbbreviation,
      showersSum,
      showersUnitAbbreviation,
      snowSum,
      snowUnitAbbreviation
    });
  }

  return forecasts;
};
