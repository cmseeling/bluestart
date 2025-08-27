export type CurrentConditions = {
  time: Date;
  temperature: number;
  temperatureUnitAbbreviation: string;
  weatherCode: number;
  isDay: boolean;
  precipitation: number;
  precipitationUnitAbbreviation: string;
  rain: number;
  rainUnitAbbreviation: string;
  showers: number;
  showersUnitAbbreviation: string;
  snowfall: number;
  snowfallUnitAbbreviation: string;
};
