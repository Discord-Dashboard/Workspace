import { BaseException } from './exceptions/BaseException';
import { Logger } from '@utils/Logger';
import { ExceptionPriority } from '@utils/exceptions/IExceptionDetails';

class GlobalExceptionHandler {
  /**
   * Handles exceptions by logging them and throwing critical exceptions.
   *
   * This method logs the exception based on its priority and rethrows it
   * if the priority is 'CRITICAL'. It distinguishes between regular errors
   * and custom BaseExceptions to handle them differently.
   *
   * @param exception - The exception to be handled (can be of type BaseException or Error).
   * @param ctx - The context of the exception (e.g., request context, user data).
   */
  public static handleError(exception: BaseException | Error, ctx: any): void {
    // Check if the exception is of type BaseException
    if (exception instanceof BaseException) {
      // If it's a custom BaseException, get its priority level
      const priority = exception.details.priority;

      // Log the exception using the Logger class
      Logger.log(exception);

      // If the priority is CRITICAL, rethrow the exception
      if (priority === ExceptionPriority.CRITICAL) {
        throw exception;
      }
    } else {
      Logger.log(exception);

      // Handle regular errors if needed
      // For example, you might want to log a generic message or rethrow based on specific conditions
      // In this case, we are just logging the error.
      console.error('Unhandled error:', exception);
    }
  }
}

export default GlobalExceptionHandler;
