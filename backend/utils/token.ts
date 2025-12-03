import crypto from 'crypto'

const VERIFICATION_TOKEN_EXPIRY_HOURS = 24

/**
 * Generate a secure random verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Get the expiry date for a verification token (24 hours from now)
 */
export function getVerificationTokenExpiry(): Date {
  const expiry = new Date()
  expiry.setHours(expiry.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS)
  return expiry
}

/**
 * Check if a verification token has expired
 */
export function isTokenExpired(expiryDate: Date | null): boolean {
  if (!expiryDate) return true
  return new Date() > expiryDate
}

