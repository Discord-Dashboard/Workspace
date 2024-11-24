import IExceptionDetails from './IExceptionDetails';

/**
 * Base class for custom exceptions.
 *
 * This abstract class extends the built-in `Error` class and provides additional
 * functionality for handling exceptions with custom details.
 *
 * The `details` property contains additional metadata about the exception,
 * such as its priority and other specific information.
 */
export abstract class BaseException extends Error {
  /**
   * Constructor to initialize the exception.
   *
   * @param message - The error message describing the exception.
   * @param name - The name of the exception (usually the class name).
   * @param details - Additional details about the exception, such as priority, error code, etc.
   */
  constructor(
    public override message: string,
    public override name: string,
    public details: IExceptionDetails
  ) {
    super(message); // Call the parent class constructor to set the message property.
    this.name = name; // Set the exception's name (typically the class name).
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for better debugging.
  }
}
