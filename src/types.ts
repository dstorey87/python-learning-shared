// Shared TypeScript interfaces for the Python Learning Portal

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  testCode: string;
  solutionCode: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  order: number;
  estimatedTime: number; // in minutes
}

export interface TestResult {
  passed: boolean;
  output: string;
  errors?: string;
  executionTime: number;
  testCases: TestCase[];
}

export interface TestCase {
  name: string;
  passed: boolean;
  expected?: any;
  actual?: any;
  error?: string;
}

export interface UserProgress {
  userId: string;
  exerciseId: string;
  completed: boolean;
  attempts: number;
  bestSolution?: string;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export interface CodeExecution {
  code: string;
  exerciseId: string;
  runTests: boolean;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  errors?: string;
  testResult?: TestResult;
  executionTime: number;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: Date;
  totalExercisesCompleted: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
}

export interface Session {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  exercisesWorkedOn: string[];
  totalTimeSpent: number;
}

export interface Hint {
  id: string;
  exerciseId: string;
  title: string;
  content: string;
  order: number;
  revealLevel: number; // 1 = basic hint, 2 = more detailed, 3 = solution approach
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Payment and Stripe Integration
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  clientSecret: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

// Authentication and subscription types for future use
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  subscription?: Subscription;
  role: 'guest' | 'student' | 'pro' | 'enterprise';
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'student' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// Supabase Authentication Types
export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  aud: string;
  created_at: string;
  updated_at?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: SupabaseUser;
}

export interface AuthError {
  message: string;
  status?: number;
}

// Frontend-specific types
export interface UIState {
  currentExercise: Exercise | null;
  userCode: string;
  isRunning: boolean;
  showSolution: boolean;
  showHints: boolean;
  testResults: TestResult | null;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

export interface EditorSettings {
  fontSize: number;
  theme: string;
  wordWrap: boolean;
  minimap: boolean;
  autoSave: boolean;
}

// Backend-specific types
export interface DatabaseUser {
  id: string;
  username: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProgress {
  id: string;
  user_id: string;
  exercise_id: string;
  completed: boolean;
  attempts: number;
  best_solution: string | null;
  completed_at: string | null;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseSession {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  exercises_worked_on: string;
  total_time_spent: number;
  created_at: string;
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class ExecutionError extends AppError {
  constructor(message: string, public originalError?: Error) {
    super(message, 500, 'EXECUTION_ERROR');
    this.name = 'ExecutionError';
  }
}