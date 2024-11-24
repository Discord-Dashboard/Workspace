/**
 * Enum representing the priority levels of exceptions.
 *
 * - `INFO`: Informational level, typically used for non-critical messages.
 * - `WARNING`: Warning level, used for situations that are not critical but may require attention.
 * - `CRITICAL`: Critical level, indicating a severe issue that should interrupt normal execution.
 */
export enum ExceptionPriority {
  INFO, // Informational level
  WARNING, // Warning level
  CRITICAL, // Critical level
}

/**
 * Interface defining the structure of exception details.
 *
 * This interface is used to specify additional details about an exception, such as its priority.
 */
export default interface IExceptionDetails {
  priority: ExceptionPriority; // Priority of the exception (INFO, WARNING, CRITICAL)
}
