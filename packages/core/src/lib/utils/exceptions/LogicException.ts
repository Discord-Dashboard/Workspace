import { BaseException } from './BaseException';
import IExceptionDetails from './IExceptionDetails';

/**
 * Custom exception class for logic-related errors.
 *
 * This class extends the `BaseException` class and represents errors
 * that occur due to issues in the logic of the application.
 */
export class LogicException extends BaseException {
  /**
   * Constructor to initialize a logic-related exception.
   *
   * @param message - The error message describing the exception.
   * @param details - Additional details about the exception (such as priority, error code, etc.).
   */
  constructor(message: string, details: IExceptionDetails) {
    // Call the parent class constructor with the message, name of the exception, and details.
    super(message, 'LogicException', details);
  }
}
