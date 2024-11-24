import { BaseException } from './BaseException';
import IExceptionDetails from './IExceptionDetails';

/**
 * Exception class for internal application errors.
 *
 * This class extends the `BaseException` class and represents errors
 * caused by unexpected issues or failures within the application's core logic.
 */
export class InternalException extends BaseException {
  /**
   * Initializes a new instance of the `InternalException` class.
   *
   * @param message - A descriptive error message explaining the issue.
   * @param details - Additional context about the exception (e.g., priority, error code, etc.).
   */
  constructor(message: string, details: IExceptionDetails) {
    // Pass the error message, exception name, and details to the base class.
    super(message, 'InternalException', details);
  }
}
