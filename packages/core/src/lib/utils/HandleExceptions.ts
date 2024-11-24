import GlobalExceptionHandler from '@utils/GlobalExceptionHandler';
import { BaseException } from '@utils/exceptions/BaseException';

/**
 * Decorator that handles exceptions for class methods.
 *
 * This decorator wraps the original method to catch any thrown exceptions,
 * then delegates the exception handling to the GlobalExceptionHandler.
 */
function HandleExceptions(
  target: object, // The target class that the method belongs to
  propertyKey: string | symbol, // The name of the method being decorated
  descriptor: TypedPropertyDescriptor<any> // The method descriptor
): TypedPropertyDescriptor<any> | void {
  // Check if the decorator is used on a method
  if (!descriptor || typeof descriptor.value !== 'function') {
    throw new Error(`@HandleExceptions decorator can only be used on methods.`);
  }

  // Store the original method
  const originalMethod = descriptor.value;

  // Redefine the method to add exception handling
  descriptor.value = function (...args: any[]) {
    try {
      // Call the original method and return its result
      return originalMethod.apply(this, args);
    } catch (error) {
      // If an exception is caught, pass it to the GlobalExceptionHandler
      return GlobalExceptionHandler.handleError(
        error as BaseException | Error, // Cast the error to BaseException | Error
        args[0] // Pass the first argument (usually context or request) to the handler
      );
    }
  };

  return descriptor; // Return the modified descriptor
}

export default HandleExceptions;
