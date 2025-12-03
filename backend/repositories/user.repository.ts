import { prisma } from '@/lib/db'

export interface CreateUserData {
  username: string
  email?: string
  passwordHash: string
  name?: string
}

/**
 * User Repository - Data access layer for User model
 */
export const userRepository = {
  /**
   * Find a user by their ID
   */
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    })
  },

  /**
   * Find a user by their username
   */
  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username }
    })
  },

  /**
   * Find a user by their email
   */
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  },

  /**
   * Find a user by username or email (for login)
   */
  async findByUsernameOrEmail(usernameOrEmail: string) {
    return prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    })
  },

  /**
   * Create a new user
   */
  async create(data: CreateUserData) {
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email || null,
        passwordHash: data.passwordHash,
        name: data.name || null,
        isGuest: false
      }
    })
  },

  /**
   * Update a user's profile
   */
  async update(id: string, data: Partial<{ name: string; email: string }>) {
    return prisma.user.update({
      where: { id },
      data
    })
  },

  /**
   * Update a user's password
   */
  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash }
    })
  },

  /**
   * Check if username is already taken
   */
  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true }
    })
    return user !== null
  },

  /**
   * Check if email is already taken
   */
  async isEmailTaken(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    })
    return user !== null
  },

  /**
   * Get all users (for admin/listing purposes)
   */
  async findAll() {
    return prisma.user.findMany({
      where: { isGuest: false },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  /**
   * Set verification token for a user
   */
  async setVerificationToken(userId: string, token: string, expiry: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken: token,
        verificationExpiry: expiry
      }
    })
  },

  /**
   * Find a user by their verification token
   */
  async findByVerificationToken(token: string) {
    return prisma.user.findUnique({
      where: { verificationToken: token }
    })
  },

  /**
   * Mark a user's email as verified and clear the verification token
   */
  async verifyEmail(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationExpiry: null
      }
    })
  },

  /**
   * Check if user's email is verified
   */
  async isEmailVerified(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailVerified: true }
    })
    return user?.emailVerified !== null
  }
}
