export type WeatherConditions =
  | 'Clear'
  | 'Mainly Clear'
  | 'Partly Cloudy'
  | 'Overcast'
  | 'Fog'
  | 'Light Drizzle'
  | 'Drizzle'
  | 'Heavy Drizzle'
  | 'Freezing Drizzle'
  | 'Heavy Freezing Drizzle'
  | 'Light Rain'
  | 'Rain'
  | 'Heavy Rain'
  | 'Freezing Rain'
  | 'Heavy Freezing Rain'
  | 'Light Snow'
  | 'Snow'
  | 'Heavy Snow'
  | 'Light Rain Showers'
  | 'Rain Showers'
  | 'Heavy Rain Showers'
  | 'Snow Showers'
  | 'Heavy Snow Showers'
  | 'Thunderstorms'
  | 'Hail'
  | 'Heavy Hail';

export const WMOCodes: Map<number, WeatherConditions> = new Map([
  [0, 'Clear'],
  [1, 'Mainly Clear'],
  [2, 'Partly Cloudy'],
  [3, 'Overcast'],
  [45, 'Fog'],
  [48, 'Fog'],
  [51, 'Light Drizzle'],
  [53, 'Drizzle'],
  [55, 'Heavy Drizzle'],
  [56, 'Freezing Drizzle'],
  [57, 'Heavy Freezing Drizzle'],
  [61, 'Light Rain'],
  [63, 'Rain'],
  [65, 'Heavy Rain'],
  [66, 'Freezing Rain'],
  [67, 'Heavy Freezing Rain'],
  [71, 'Light Snow'],
  [73, 'Snow'],
  [75, 'Heavy Snow'],
  [77, 'Snow'],
  [80, 'Light Rain Showers'],
  [81, 'Rain Showers'],
  [82, 'Heavy Rain Showers'],
  [95, 'Thunderstorms'],
  [96, 'Hail'],
  [99, 'Heavy Hail']
]);
