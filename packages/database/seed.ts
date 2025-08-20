import { dotenvConfigSchema } from '@bluestart/shared/config';
import { TemparatureUnits } from '@bluestart/shared/enums';
import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import { formatISO } from 'date-fns/formatISO';
import * as dotenv from 'dotenv';
import { drizzle, schema } from '.';
import { CommandType } from './enums';
import { UpsertCommand, UpsertCommandDelay, UpsertCommandSetting, UpsertPauseDate } from './types';

async function main() {
  dotenv.config();
  const dotenvConfig = dotenvConfigSchema.parse(process.env);

  console.log('db url: ' + dotenvConfig.databaseUrl);

  const client = new Database(dotenvConfig.databaseUrl);

  const db = drizzle(client, { schema });

  const normalCommandId = randomUUID();
  const normalCommand: UpsertCommand = {
    id: normalCommandId,
    name: 'normal command',
    day: 1,
    activationTime: '7:30'
  };
  const commandResult = await db.insert(schema.commands).values(normalCommand);
  if (commandResult.changes === 0) {
    console.log('Command not created. Check DB for existing entry');
  }

  const normalCommandSettings: UpsertCommandSetting = {
    commandId: normalCommandId,
    commandType: CommandType.Climate,
    tempBelow: 25,
    tempUnits: TemparatureUnits.Fahrenheit,
    hvacTemp: 76,
    heatedFeatures: true
  };
  const normalSettingsResult = await db
    .insert(schema.commandSettings)
    .values(normalCommandSettings);
  if (normalSettingsResult.changes === 0) {
    console.log('Command settings not created. Check DB for existing entry');
  }

  const alreadyExecutedCommandId = randomUUID();
  const alreadyExecutedCommand: UpsertCommand = {
    id: alreadyExecutedCommandId,
    name: 'already executed command',
    day: 1,
    activationTime: '7:30',
    lastExecuted: new Date('August 18, 2025 07:32:00')
  };
  const alreadyExecutedResult = await db.insert(schema.commands).values(alreadyExecutedCommand);
  if (alreadyExecutedResult.changes === 0) {
    console.log('Already executed command not created. Check DB for existing entry');
  }

  const disabledCommandId = randomUUID();
  const disabledCommand: UpsertCommand = {
    id: disabledCommandId,
    name: 'disabled command',
    day: 1,
    activationTime: '7:30',
    isDisabled: true
  };
  const disabledCommandResult = await db.insert(schema.commands).values(disabledCommand);
  if (disabledCommandResult.changes === 0) {
    console.log('Disabled command not created. Check DB for existing entry');
  }

  const pausedCommandId = randomUUID();
  const pausedCommand: UpsertCommand = {
    id: pausedCommandId,
    name: 'paused command',
    day: 1,
    activationTime: '7:30'
  };
  const pausedCommandResult = await db.insert(schema.commands).values(pausedCommand);
  if (pausedCommandResult.changes === 0) {
    console.log('Paused command not created. Check DB for existing entry');
  }

  const pauseDates: UpsertPauseDate = {
    commandId: pausedCommandId,
    pauseDateStart: formatISO(new Date(0), { representation: 'date' }),
    pauseDateEnd: formatISO(new Date('3999-12-31'), { representation: 'date' })
  };
  const pauseDatesResult = await db.insert(schema.pauseDates).values(pauseDates);
  if (pauseDatesResult.changes === 0) {
    console.log('Pause dates not created. Check DB for existing entry');
  }

  const futureCommandId = randomUUID();
  const futureCommand: UpsertCommand = {
    id: futureCommandId,
    name: 'future pause command',
    day: 1,
    activationTime: '7:30'
  };
  const futureCommandResult = await db.insert(schema.commands).values(futureCommand);
  if (futureCommandResult.changes === 0) {
    console.log('Future pause command not created. Check DB for existing entry');
  }

  const futureCommandSettings: UpsertCommandSetting = {
    commandId: futureCommandId,
    commandType: CommandType.Climate,
    tempBelow: 20,
    tempUnits: TemparatureUnits.Fahrenheit,
    hvacTemp: 76,
    heatedFeatures: false
  };
  const futureSettingsResult = await db
    .insert(schema.commandSettings)
    .values(futureCommandSettings);
  if (futureSettingsResult.changes === 0) {
    console.log('Future command settings not created. Check DB for existing entry');
  }

  const futurePauseDates: UpsertPauseDate = {
    commandId: futureCommandId,
    pauseDateStart: formatISO(new Date('3999-01-01'), { representation: 'date' }),
    pauseDateEnd: formatISO(new Date('3999-12-31'), { representation: 'date' })
  };
  const futurePauseDatesResult = await db.insert(schema.pauseDates).values(futurePauseDates);
  if (futurePauseDatesResult.changes === 0) {
    console.log('Future pause dates not created. Check DB for existing entry');
  }

  const delayedCommandId = randomUUID();
  const delayedCommand: UpsertCommand = {
    id: delayedCommandId,
    name: 'delayed command',
    day: 1,
    activationTime: '8:00'
  };
  const delayedCommandResult = await db.insert(schema.commands).values(delayedCommand);
  if (delayedCommandResult.changes === 0) {
    console.log('Delayed command not created. Check DB for existing entry');
  }

  const delayEntry: UpsertCommandDelay = {
    commandId: delayedCommandId,
    date: formatISO(new Date(), { representation: 'date' }),
    delay: 15
  };
  const delayEntryResult = await db.insert(schema.commandDelays).values(delayEntry);
  if (delayEntryResult.changes === 0) {
    console.log('Delay entry not created. Check DB for existing entry');
  }
}

main();
