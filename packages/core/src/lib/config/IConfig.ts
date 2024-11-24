/**
 * Enum representing the different log levels.
 *
 * - ALL: Logs everything (all levels of logs).
 * - IMPORTANT: Logs important events and warnings.
 * - CRITICAL: Logs only critical errors.
 * - NONE: No logging.
 */
export enum LogLevel {
  ALL = 'ALL', // Log everything
  IMPORTANT = 'IMPORTANT', // Log important events, warnings, and errors
  CRITICAL = 'CRITICAL', // Log only critical errors
  NONE = 'NONE', // No logging
}

/**
 * Interface representing the configuration settings.
 *
 * The configuration options include:
 * - DBD_PORT: The port on which the dashboard server will run.
 * - DBD_TEST: A test configuration value (optional).
 * - DBD_LOG_FILE: The log file path where logs will be written.
 * - DBD_LOG_LEVEL: The log level determining the verbosity of logs.
 */
export interface IConfig {
  DBD_PORT: number; // The port number for the server
  DBD_TEST: string; // Test configuration value (optional, used for testing purposes)
  DBD_LOG_FILE: string; // Path to the log file
  DBD_LOG_LEVEL: LogLevel; // Log level indicating the types of logs to be recorded
}
