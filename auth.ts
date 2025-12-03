import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'
import { authConfig } from './auth.config'

// Custom error for unverified email
class EmailNotVerifiedError extends Error {
  constructor(email: string) {
    super(`EMAIL_NOT_VERIFIED:${email}`)
    this.name = 'EmailNotVerifiedError'
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const username = credentials.username as string
        const password = credentials.password as string

        // Find user by username or email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: username },
              { email: username }
            ]
          }
        })

        if (!user || !user.passwordHash) {
          return null
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash)

        if (!isValidPassword) {
          return null
        }

        // Check if email is verified
        if (!user.emailVerified && user.email) {
          throw new EmailNotVerifiedError(user.email)
        }

        return {
          id: user.id,
          name: user.name || user.username,
          email: user.email,
          username: user.username
        }
      }
    })
  ]
})
