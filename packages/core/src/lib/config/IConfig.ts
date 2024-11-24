export enum LogLevel {
  ALL = 'ALL', // Log everything
  IMPORTANT = 'IMPORTANT', // Log important events, warnings, and errors
  CRITICAL = 'CRITICAL', // Log only critical errors
  NONE = 'NONE', // No logging
}

export interface IConfig {
  server: {
    port: number;
  };
  logs: {
    file: string;
    level: LogLevel;
  };
}
