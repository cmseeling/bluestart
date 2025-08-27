export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export class ConsoleLogger {
  readonly appName: string;
  private configuredLogLevel: LogLevel;

  constructor(appName: string, configuredLogLevel: LogLevel) {
    this.appName = appName;
    this.configuredLogLevel = configuredLogLevel;
  }

  setLogLevel(newLogLevel: LogLevel) {
    this.configuredLogLevel = newLogLevel;
  }

  private log(level: LogLevel, message?: any, ...args: any[]) {
    let logFunc = console.log;
    if (level === LogLevel.ERROR) {
      logFunc = console.error;
    }

    if (typeof message === 'string') {
      logFunc(`${this.appName} - ${level}: ${message}`, args.length ? args : '');
    } else {
      logFunc(`${this.appName} - ${level}:`, message, args.length ? args : '');
    }
  }

  debug(message?: any, ...args: any[]) {
    if (this.configuredLogLevel === LogLevel.DEBUG) {
      this.log(LogLevel.DEBUG, message, ...args);
    }
  }

  info(message?: any, ...args: any[]) {
    if (this.configuredLogLevel === LogLevel.DEBUG || this.configuredLogLevel === LogLevel.INFO) {
      this.log(LogLevel.INFO, message, ...args);
    }
  }

  warn(message?: any, ...args: any[]) {
    if (
      this.configuredLogLevel === LogLevel.DEBUG ||
      this.configuredLogLevel === LogLevel.INFO ||
      this.configuredLogLevel === LogLevel.WARN
    ) {
      this.log(LogLevel.WARN, message, ...args);
    }
  }

  error(message?: any, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }
}
