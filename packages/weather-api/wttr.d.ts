export type WeatherDescription = {
  value: string;
};

export type WeatherIconUrl = {
  value: string;
};

export type CurrentCondition = {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  localObsDateTime: string;
  observation_time: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: WeatherDescription[];
  weatherIconUrl: WeatherIconUrl[];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
};

export type Astronomy = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
};

export type Hourly = {
  time: string;
  tempC: string;
  tempF: string;
  windspeedMiles: string;
  windspeedKmph: string;
  winddirDegree: string;
  winddir16Point: string;
  weatherCode: string;
  weatherDesc: WeatherDescription[];
  weatherIconUrl: WeatherIconUrl[];
  precipMM: string;
  precipInches: string;
  humidity: string;
  visibility: string;
  visibilityMiles: string;
  pressure: string;
  pressureInches: string;
  cloudcover: string;
  HeatIndexC: string;
  HeatIndexF: string;
  DewPointC: string;
  DewPointF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustMiles: string;
  WindGustKmph: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofwindy: string;
  chanceofovercast: string;
  chanceofsunshine: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceoffog: string;
  chanceofsnow: string;
  chanceofthunder: string;
  uvIndex: string;
};

export type Weather = {
  date: string;
  astronomy: Astronomy[];
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  avgtempC: string;
  avgtempF: string;
  totalSnow_cm: string;
  sunHour: string;
  uvIndex: string;
  hourly: Hourly[];
};

export type Request = {
  type: string;
  query: string;
};

export type NearestArea = {
  areaName: WeatherDescription[];
  country: WeatherDescription[];
  region: WeatherDescription[];
  latitude: string;
  longitude: string;
  population: string;
  weatherUrl: WeatherDescription[];
};

export type WttrResponse = {
  current_condition: CurrentCondition[];
  weather: Weather[];
  nearest_area: NearestArea[];
  request: Request[];
};
