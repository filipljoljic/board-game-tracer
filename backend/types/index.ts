// Backend-specific types

export interface AuthCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  name?: string
}

export interface AuthResult {
  success: boolean
  user?: {
    id: string
    username: string
    email: string | null
    name: string | null
  }
  error?: string
}

export interface SessionUser {
  id: string
  username: string
  email: string | null
  name: string | null
}
