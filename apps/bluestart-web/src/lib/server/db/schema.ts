import { CommandType, TemparatureUnits } from '@bluestart/data/db/enums';
import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer, index, real } from 'drizzle-orm/sqlite-core';

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

// export type Session = typeof sessionTable.$inferSelect;

// export type User = typeof userTable.$inferSelect;

export const commands = sqliteTable(
	'commands',
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		name: text().notNull(),
		day: text().notNull(),
		activationTime: text().notNull()
	},
	(table) => [index('commands_day_index').on(table.day)]
);

export const locations = sqliteTable(
	'locations',
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		name: text().notNull(),
		latitude: real().notNull(),
		letitude: real().notNull()
	},
	(table) => [index('locations_name_index').on(table.name)]
);

export const commandSettings = sqliteTable('commandSettings', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	commandType: text({
		enum: [CommandType.Climate, CommandType.Charging]
	}).notNull(),
	commandId: text().references(() => commands.id, {
		onDelete: 'cascade'
	}),
	locationId: text().references(() => locations.id, {
		onDelete: 'set null'
	}),
	tempAbove: integer(),
	tempBelow: integer(),
	tempUnits: text({ enum: [TemparatureUnits.Fahrenheit, TemparatureUnits.Celsius] }),
	hvacTemp: integer(),
	defrost: integer({ mode: 'boolean' }),
	heatedFeatures: integer({ mode: 'boolean' })
});

export const pauseDates = sqliteTable('pauseDates', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	commandId: text().references(() => commands.id, {
		onDelete: 'cascade'
	}),
	pauseDate: integer({ mode: 'timestamp' }).notNull()
});

export const commandDelays = sqliteTable('commandDelays', {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	commandId: text().references(() => commands.id, {
		onDelete: 'cascade'
	}),
	date: integer({ mode: 'timestamp' }).notNull(),
	delay: integer().notNull()
});

// export type Command = typeof commands.$inferSelect;
// export type Location = typeof locations.$inferSelect;
// export type CommandSetting = typeof commandSettings.$inferSelect;
// export type PauseDate = typeof pauseDates.$inferSelect;
// export type CommandDelay = typeof commandDelays.$inferSelect;
// export type CommandSettingWithLocation = CommandSetting & {
//   location?: Location | null;
// };
// export type CommandWithAllData = Command & {
//   settings: CommandSettingWithLocation;
//   pauseDates: PauseDate[];
//   delays: CommandDelay[];
// };

export const commandSettingRelations = relations(commandSettings, ({ one }) => ({
	command: one(commands, {
		fields: [commandSettings.commandId],
		references: [commands.id]
	}),
	location: one(locations, {
		fields: [commandSettings.locationId],
		references: [locations.id]
	})
}));

export const pauseDateRelations = relations(pauseDates, ({ one }) => ({
	command: one(commands, {
		fields: [pauseDates.commandId],
		references: [commands.id]
	})
}));

export const commandDelayRelations = relations(commandDelays, ({ one }) => ({
	command: one(commands, {
		fields: [commandDelays.commandId],
		references: [commands.id]
	})
}));

export const commandRelations = relations(commands, ({ one, many }) => ({
	settings: one(commandSettings),
	pauseDates: many(pauseDates),
	delays: many(commandDelays)
}));
