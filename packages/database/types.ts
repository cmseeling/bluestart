import {
  commandDelayTable,
  commandTable,
  // locations,
  commandSettingsTable,
  pauseRangeTable,
  sessionTable,
  userTable
} from './schema';

export type User = typeof userTable.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;

export type Command = typeof commandTable.$inferSelect;
export type UpsertCommand = typeof commandTable.$inferInsert;
// export type Location = typeof locations.$inferSelect;
// export type UpsertLocation = typeof locations.$inferInsert;
export type CommandSettings = typeof commandSettingsTable.$inferSelect;
export type UpsertCommandSettings = typeof commandSettingsTable.$inferInsert;
export type PauseRange = typeof pauseRangeTable.$inferSelect;
export type UpsertPauseRange = typeof pauseRangeTable.$inferInsert;
export type CommandDelay = typeof commandDelayTable.$inferSelect;
export type UpsertCommandDelay = typeof commandDelayTable.$inferInsert;

// export type CommandSettingWithLocation = CommandSetting & {
//   location?: Location | null;
// };

export type CommandWithSettings = Command & {
  settings: CommandSettings;
};

export type CommandWithAllData = CommandWithSettings & {
  pauseRanges: PauseRange[];
  delays: CommandDelay[];
};
