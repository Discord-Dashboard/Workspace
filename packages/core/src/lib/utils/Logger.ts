import fs from 'fs';
import { ExceptionPriority } from './exceptions/IExceptionDetails';
import Config from '@config/Config';
import { LogLevel } from '@config/IConfig';
import { BaseException } from '@utils/exceptions/BaseException';
import { LogicException } from '@utils/exceptions/LogicException';

export class Logger {
  /**
   * Logs an exception depending on its priority and logging settings.
   * Optionally, it can save the log to a file if specified.
   * @param exception - The exception object to log
   * @param saveToFile - Whether to save the log to a file (default is true)
   */
  static log(exception: BaseException | Error, saveToFile = true): void {
    // Get the current timestamp in ISO format
    const timestamp = new Date().toISOString();

    // Initialize the formatted message
    let formattedMessage = '';

    // Check if it's a BaseException or regular Error
    if (exception instanceof BaseException) {
      const priority = exception.details?.priority;
      const message = `[${exception.name}] ${exception.message}`;
      formattedMessage = `[${timestamp}] [${ExceptionPriority[priority]}]: ${message}`;

      // Handle logging based on priority for BaseException
      this.handleLogLevel(priority, formattedMessage);
    } else if (exception instanceof Error) {
      // For regular errors, we use a default priority level (e.g., INFO)
      const message = `[Error] ${exception.message}`;
      formattedMessage = `[${timestamp}] [INFO]: ${message}`;

      // Log the regular error message
      this.handleLogLevel(ExceptionPriority.INFO, formattedMessage);
    }

    // If saveToFile is true, save the log message to a file
    if (saveToFile) {
      this.writeToFile(formattedMessage);
    }
  }

  /**
   * Handles the logging based on the log level and priority.
   * @param priority - The priority of the exception
   * @param formattedMessage - The formatted log message
   */
  private static handleLogLevel(
    priority: ExceptionPriority,
    formattedMessage: string
  ): void {
    // Retrieve the logging level from the configuration
    const logLevel = Config.getInstance().get().logs.level;

    // If the log level is NONE, do not log anything
    if (logLevel === LogLevel.NONE) return;

    // Log the exception based on its priority
    switch (priority) {
      case ExceptionPriority.INFO:
        // Only log INFO if the log level is set to ALL
        if (logLevel !== LogLevel.ALL) break;
        console.info(formattedMessage);
        break;

      case ExceptionPriority.WARNING:
        // Do not log WARNING if the log level is set to CRITICAL
        if (logLevel === LogLevel.CRITICAL) break;
        console.warn(formattedMessage);
        break;

      case ExceptionPriority.CRITICAL:
        // Log critical errors
        console.error(formattedMessage);
        break;
    }
  }

  /**
   * Writes the log message to a file.
   * If an error occurs during the write operation, it logs a LogicException.
   * @param logMessage - The message to write to the log file
   */
  static writeToFile(logMessage: string): void {
    try {
      fs.appendFile(
        Config.getInstance().get().logs.file,
        logMessage + '\n',
        (err) => {
          if (err) {
            console.error(`Failed to write log to file: ${err.message}`);
          }
        }
      );
    } catch {
      // Log an exception if the log file cannot be written
      Logger.log(
        new LogicException('Could not save log to file.', {
          priority: ExceptionPriority.INFO,
        }),
        false
      );
    }
  }
}
