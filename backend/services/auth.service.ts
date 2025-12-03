import { userRepository } from '@/backend/repositories'
import { hashPassword, verifyPassword, validateRegistration, generateVerificationToken, getVerificationTokenExpiry } from '@/backend/utils'
import { emailService } from './email.service'
import type { AuthCredentials, RegisterData, AuthResult, SessionUser } from '@/backend/types'

/**
 * Authentication Service - Handles user authentication logic
 */
export const authService = {
  /**
   * Authenticate a user with username/email and password
   */
  async authenticate(credentials: AuthCredentials): Promise<AuthResult> {
    const { username, password } = credentials

    // Find user by username or email
    const user = await userRepository.findByUsernameOrEmail(username)

    if (!user) {
      return {
        success: false,
        error: 'Invalid username or password'
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash)

    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid username or password'
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    }
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResult> {
    // Validate input
    const validation = validateRegistration(data)
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors.join(', ')
      }
    }

    // Check if username is taken
    const usernameTaken = await userRepository.isUsernameTaken(data.username)
    if (usernameTaken) {
      return {
        success: false,
        error: 'Username is already taken'
      }
    }

    // Check if email is taken
    const emailTaken = await userRepository.isEmailTaken(data.email)
    if (emailTaken) {
      return {
        success: false,
        error: 'Email is already registered'
      }
    }

    // Hash password
    const passwordHash = await hashPassword(data.password)

    // Create user
    const user = await userRepository.create({
      username: data.username,
      email: data.email,
      passwordHash,
      name: data.name
    })

    // Generate verification token and send email
    const verificationToken = generateVerificationToken()
    const verificationExpiry = getVerificationTokenExpiry()

    await userRepository.setVerificationToken(
      user.id,
      verificationToken,
      verificationExpiry
    )

    // Send verification email (don't block registration if email fails)
    await emailService.sendVerificationEmail(
      data.email,
      data.name || null,
      verificationToken
    )

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    }
  },

  /**
   * Get user by ID for session
   */
  async getUserById(id: string): Promise<SessionUser | null> {
    const user = await userRepository.findById(id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    }
  }
}


