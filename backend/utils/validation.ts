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
 * Validate password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one number (0-9)
 * - At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) {
    return false
  }

  // Check for at least one number
  const hasNumber = /[0-9]/.test(password)
  if (!hasNumber) {
    return false
  }

  // Check for at least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
  if (!hasSpecialChar) {
    return false
  }

  return true
}

/**
 * Get detailed password validation errors
 */
export function getPasswordValidationErrors(password: string): string[] {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)')
  }

  return errors
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

  const passwordErrors = getPasswordValidationErrors(data.password)
  if (passwordErrors.length > 0) {
    errors.push(...passwordErrors)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}


