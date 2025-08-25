// Main entry point for @python-learning/shared package
// Main entry point for the Python Learning Portal shared types library
export * from './types';

// Version information
export const VERSION = '1.0.0';

// Re-export commonly used types for convenience
export type {
  Exercise,
  User,
  TestResult,
  TestCase,
  APIResponse,
  CodeExecution,
  CodeExecutionResult,
  UserProgress,
  Hint,
  Session,
  AuthUser,
  Subscription,
  UIState,
  EditorSettings
} from './types';