/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate username format (alphanumeric, underscores, 3-30 chars)
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/
  return usernameRegex.test(username)
}

/**
 * Validate password strength (min 8 chars)
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

/**
 * Validate registration data
 */
export function validateRegistration(data: {
  username: string
  email: string
  password: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!isValidUsername(data.username)) {
    errors.push('Username must be 3-30 characters, alphanumeric and underscores only')
  }

  if (!isValidEmail(data.email)) {
    errors.push('Invalid email format')
  }

  if (!isValidPassword(data.password)) {
    errors.push('Password must be at least 8 characters')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}


