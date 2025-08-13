export type DailyForecast = {
  time: Date;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  rainSum: number;
  showersSum: number;
  snowSum: number;
};
