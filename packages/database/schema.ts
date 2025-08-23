import { TemparatureUnits } from '@bluestart/shared/enums';
import { relations } from 'drizzle-orm';
import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { CommandType } from './enums';

export const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  forcePasswordChange: integer({ mode: 'boolean' }).notNull().default(false),
  isMasterAccount: integer({ mode: 'boolean' }).notNull().default(false)
});

export const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// export const appSettingsTable = sqlite('appSetting', {

// })

export const commandTable = sqliteTable(
  'command',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text().notNull(),
    day: integer({ mode: 'number' }).notNull(),
    activationTime: text().notNull(),
    isDisabled: integer({ mode: 'boolean' }).notNull().default(false),
    lastExecuted: integer({ mode: 'timestamp' })
  },
  (table) => [index('command_day_index').on(table.day)]
);

// possible future enhancement: only run command if vehicle is at specific location
// export const locationTable = sqliteTable(
//   'location',
//   {
//     id: text()
//       .primaryKey()
//       .$defaultFn(() => crypto.randomUUID()),
//     name: text().notNull(),
//     latitude: real().notNull(),
//     letitude: real().notNull()
//   },
//   (table) => [index('locations_name_index').on(table.name)]
// );

export const commandSettingsTable = sqliteTable('commandSettings', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  commandType: text({
    enum: [CommandType.Climate, CommandType.Charging]
  }).notNull(),
  commandId: text().references(() => commandTable.id, {
    onDelete: 'cascade'
  }),
  // locationId: text().references(() => locations.id, {
  //   onDelete: 'set null'
  // }),
  tempAbove: integer(),
  tempBelow: integer(),
  tempUnits: text({ enum: [TemparatureUnits.Fahrenheit, TemparatureUnits.Celsius] }),
  hvacTemp: integer(),
  defrost: integer({ mode: 'boolean' }),
  heatedFeatures: integer({ mode: 'boolean' })
});

export const pauseRangeTable = sqliteTable('pauseRange', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  commandId: text().references(() => commandTable.id, {
    onDelete: 'cascade'
  }),
  pauseDateStart: text().notNull(),
  pauseDateEnd: text().notNull()
});

export const commandDelayTable = sqliteTable('commandDelay', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  commandId: text().references(() => commandTable.id, {
    onDelete: 'cascade'
  }),
  date: text().notNull(),
  delay: integer().notNull()
});

// export const commandSettingRelations = relations(commandSettings, ({ one }) => ({
//   command: one(commands, {
//     fields: [commandSettings.commandId],
//     references: [commands.id]
//   }),
//   location: one(locations, {
//     fields: [commandSettings.locationId],
//     references: [locations.id]
//   })
// }));

export const commandSettingsRelations = relations(commandSettingsTable, ({ one }) => ({
  command: one(commandTable, {
    fields: [commandSettingsTable.commandId],
    references: [commandTable.id]
  })
}));

export const pauseDateRelations = relations(pauseRangeTable, ({ one }) => ({
  command: one(commandTable, {
    fields: [pauseRangeTable.commandId],
    references: [commandTable.id]
  })
}));

export const commandDelayRelations = relations(commandDelayTable, ({ one }) => ({
  command: one(commandTable, {
    fields: [commandDelayTable.commandId],
    references: [commandTable.id]
  })
}));

export const commandRelations = relations(commandTable, ({ one, many }) => ({
  settings: one(commandSettingsTable),
  pauseDates: many(pauseRangeTable),
  delays: many(commandDelayTable)
}));
