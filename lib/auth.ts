import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export type DatabaseUser = {
  id: string
  username: string
  name: string | null
  email: string | null
  isGuest: boolean
}

/**
 * Gets the current authenticated user from the session.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<DatabaseUser | null> {
  const session = await auth()
  
  if (!session?.user?.id) {
    return null
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      isGuest: true
    }
  })
  
  return user
}

/**
 * Gets the current authenticated user ID.
 * Returns null if not authenticated.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth()
  return session?.user?.id || null
}

/**
 * Checks if the current user is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await auth()
  return !!session?.user
}
