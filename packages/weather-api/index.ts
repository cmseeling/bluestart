import { WttrResponse } from './wttr';

// from https://github.com/chubin/wttr.in/blob/master/lib/constants.py
export const WWO_CODE: Map<number, WeatherConditions> = new Map([
    [113, 'Sunny'],
    [116, 'PartlyCloudy'],
    [119, 'Cloudy'],
    [122, 'VeryCloudy'],
    [143, 'Fog'],
    [176, 'LightShowers'],
    [179, 'LightSleetShowers'],
    [182, 'LightSleet'],
    [185, 'LightSleet'],
    [200, 'ThunderyShowers'],
    [227, 'LightSnow'],
    [230, 'HeavySnow'],
    [248, 'Fog'],
    [260, 'Fog'],
    [263, 'LightShowers'],
    [266, 'LightRain'],
    [281, 'LightSleet'],
    [284, 'LightSleet'],
    [293, 'LightRain'],
    [296, 'LightRain'],
    [299, 'HeavyShowers'],
    [302, 'HeavyRain'],
    [305, 'HeavyShowers'],
    [308, 'HeavyRain'],
    [311, 'LightSleet'],
    [314, 'LightSleet'],
    [317, 'LightSleet'],
    [320, 'LightSnow'],
    [323, 'LightSnowShowers'],
    [326, 'LightSnowShowers'],
    [329, 'HeavySnow'],
    [332, 'HeavySnow'],
    [335, 'HeavySnowShowers'],
    [338, 'HeavySnow'],
    [350, 'LightSleet'],
    [353, 'LightShowers'],
    [356, 'HeavyShowers'],
    [359, 'HeavyRain'],
    [362, 'LightSleetShowers'],
    [365, 'LightSleetShowers'],
    [368, 'LightSnowShowers'],
    [371, 'HeavySnowShowers'],
    [374, 'LightSleetShowers'],
    [377, 'LightSleet'],
    [386, 'ThunderyShowers'],
    [389, 'ThunderyHeavyRain'],
    [392, 'ThunderySnowShowers'],
    [395, 'HeavySnowShowers']
]);

export type WeatherConditions =
  | 'Cloudy'
  | 'Fog'
  | 'HeavyRain'
  | 'HeavyShowers'
  | 'HeavySnow'
  | 'HeavySnowShowers'
  | 'LightRain'
  | 'LightShowers'
  | 'LightSleet'
  | 'LightSleetShowers'
  | 'LightSnow'
  | 'LightSnowShowers'
  | 'PartlyCloudy'
  | 'Sunny'
  | 'ThunderyHeavyRain'
  | 'ThunderyShowers'
  | 'ThunderySnowShowers'
  | 'VeryCloudy';

export const WeatherConditionIcons: Map<WeatherConditions, string> = new Map([
  ['Cloudy', 'wi-cloudy'],
  ['Fog', 'wi-fog'],
  ['HeavyRain', 'wi-rain'],
  ['HeavyShowers', 'wi-showers'],
  ['HeavySnow', 'wi-snow'],
  ['HeavySnowShowers', 'wi-snow'],
  ['LightRain', 'wi-rain'],
  ['LightShowers', 'wi-showers'],
  ['LightSleet', 'wi-sleet'],
  ['LightSleetShowers', 'wi-sleet'],
  ['LightSnow', 'wi-snow'],
  ['LightSnowShowers', 'wi-snow'],
  ['PartlyCloudy', 'wi-day-cloudy'],
  ['Sunny', 'wi-day-sunny'],
  ['ThunderyHeavyRain', 'wi-thunderstorm'],
  ['ThunderyShowers', 'wi-thunderstorm'],
  ['ThunderySnowShowers', 'wi-thunderstorm'],
  ['VeryCloudy', 'wi-cloudy']
]);

export const getWeatherIconByWWOCode = (code: number): string => {
  const condition = WWO_CODE.get(code);
  if (condition) {
    return WeatherConditionIcons.get(condition) || 'wi-day-sunny';
  }
  return 'wi-day-sunny';
};

const WTTRIN_URL = 'https://wttr.in/';

export const getForecast = async (location?: string): Promise<WttrResponse> => {
  let requestUrl = WTTRIN_URL;
  if (location !== undefined && location !== '') {
    const encodedLocation = encodeURIComponent(location);
    requestUrl += `${encodedLocation}?format=j1`;
  } else {
    requestUrl += '?format=j1';
  }

  console.log(requestUrl);

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: HTTP status code ${response.status}`);
    }
    const data = await response.json();
    return data as WttrResponse;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
