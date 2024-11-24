/**
 * Enum representing the log levels for configuring the logging behavior.
 *
 * - `ALL`: Logs all events, including informational messages, warnings, and errors.
 * - `IMPORTANT`: Logs only important events, warnings, and errors.
 * - `CRITICAL`: Logs only critical errors that may halt or impact execution.
 * - `DEVELOPMENT`: Logs additional development-specific information helpful for debugging.
 * - `NONE`: Disables logging completely.
 */
export enum LogLevel {
  IMPORTANT = 'IMPORTANT', // Log important events, warnings, and errors
  CRITICAL = 'CRITICAL', // Log only critical errors
  DEVELOPMENT = 'DEVELOPMENT', // Log development-specific information, useful for debugging
  NONE = 'NONE', // No logging at all
}

/**
 * Interface defining the structure of the application configuration.
 *
 * This interface specifies the configuration options for the server and logging system.
 */
export interface IConfig {
  server: {
    port: number; // The port on which the server will run
  };
  logs: {
    file: string; // The name of the log file
    level: LogLevel; // The log level determining what gets logged (e.g., ALL, IMPORTANT, CRITICAL)
  };
  [key: string]: any;
}
