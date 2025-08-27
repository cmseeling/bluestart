export type DailyForecast = {
  time: Date;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  tempUnitAbbreviation: string;
  precipitationProbability: number;
  rainSum: number;
  rainUnitAbbreviation: string;
  showersSum: number;
  showersUnitAbbreviation: string;
  snowSum: number;
  snowUnitAbbreviation: string;
};
