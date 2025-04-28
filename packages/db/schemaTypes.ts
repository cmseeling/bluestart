import {
  userTable,
  sessionTable,
  commands,
  locations,
  commandSettings,
  pauseDates,
  commandDelays
} from './schema';

export type User = typeof userTable.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;

export type Command = typeof commands.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type CommandSetting = typeof commandSettings.$inferSelect;
export type PauseDate = typeof pauseDates.$inferSelect;
export type CommandDelay = typeof commandDelays.$inferSelect;
export type CommandSettingWithLocation = CommandSetting & {
  location?: Location | null;
};
export type CommandWithAllData = Command & {
  settings: CommandSettingWithLocation;
  pauseDates: PauseDate[];
  delays: CommandDelay[];
};
