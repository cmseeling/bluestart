import { Unit } from '@openmeteo/sdk/unit';

export const UnitToAbbr = (unit: Unit) => {
  switch (unit) {
    case Unit.celsius:
      return 'C';
    case Unit.fahrenheit:
      return 'F';
    case Unit.millimetre:
      return 'mm';
    case Unit.centimetre:
      return 'cm';
    case Unit.metre:
      return 'm';
    case Unit.inch:
      return 'in';
    case Unit.feet:
      return 'ft';
    case Unit.metre_per_second:
      return 'm/s';
    case Unit.kilometres_per_hour:
      return 'km/h';
    case Unit.miles_per_hour:
      return 'mph';
  }
};
