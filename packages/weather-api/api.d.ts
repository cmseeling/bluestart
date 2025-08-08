type ViewOptions = '0'; // only current weather
('1'); // current weather + today's forecast
('2'); // current weather + today's + tomorrow's forecast
('A'); // ignore User-Agent and force ANSI output format (terminal)
('d'); // restrict output to standard console font glyphs
('F'); // do not show the "Follow" line
('n'); // narrow version (only day and night)
('q'); // quiet version (no "Weather report" text)
('Q'); // superquiet version (no "Weather report", no city name)
('T'); // switch terminal sequences off (no colors)

export type Options = {
  units?: 'u' | 'm' | 'M';
  view?: ViewOptions;
  lang?: string;
};
