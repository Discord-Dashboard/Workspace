/**
 * Enum representing the priority levels of exceptions.
 *
 * - `DEVELOPMENT`: Used for development-specific messages, typically not shown in production.
 * - `INFO`: Informational messages that are not critical but may provide helpful context.
 * - `WARNING`: Messages that indicate potential issues or situations requiring attention but are not critical.
 * - `CRITICAL`: Severe issues that should halt execution or require immediate action.
 */
export enum ExceptionPriority {
  DEVELOPMENT, // Development-specific information (usually for debugging purposes)
  INFO, // Informational level, non-critical messages
  WARNING, // Warning level, indicating potential issues
  CRITICAL, // Critical level, indicating severe issues requiring immediate attention
}

/**
 * Interface defining the structure of exception details.
 *
 * This interface specifies the additional details associated with an exception,
 * including its priority level and optional support (troubleshooting URL).
 */
export default interface IExceptionDetails {
  priority: ExceptionPriority; // Priority of the exception (e.g., INFO, WARNING, CRITICAL)
  supportUrl?: string; // Support troubleshooting URL
}
