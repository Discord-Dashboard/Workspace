import { BaseException } from './BaseException';
import IExceptionDetails from './IExceptionDetails';

/**
 * Exception class for configuration-related errors.
 *
 * This class extends the `BaseException` class and represents errors
 * caused by invalid or missing configuration in the application.
 */
export class ConfigurationException extends BaseException {
  /**
   * Initializes a new instance of the `ConfigurationException` class.
   *
   * @param message - A descriptive error message explaining the issue.
   * @param details - Additional context about the exception (e.g., priority, error code, etc.).
   */
  constructor(message: string, details: IExceptionDetails) {
    // Pass the error message, exception name, and details to the base class.
    super(message, 'ConfigurationException', details);
  }
}
