// API Response types
export interface HelloResponse {
  message: string
}

// Test utility types
export interface TestContext {
  baseURL: string
  headers: Record<string, string>
}

// API Error types
export interface ApiError {
  statusCode: number
  statusMessage: string
  data?: any
} 