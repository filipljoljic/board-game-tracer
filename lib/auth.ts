import { currentUser, auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export type DatabaseUser = {
  id: string
  clerkId: string | null
  name: string
  email: string | null
  isGuest: boolean
}

/**
 * Gets or creates a database user for the currently authenticated Clerk user.
 * This ensures Clerk users are synced to our database.
 */
export async function getOrCreateCurrentUser(): Promise<DatabaseUser | null> {
  const { userId: clerkId } = await auth()
  
  if (!clerkId) {
    return null
  }
  
  // Try to find existing user by clerkId
  let user = await prisma.user.findUnique({
    where: { clerkId }
  })
  
  if (user) {
    return user
  }
  
  // User doesn't exist, get Clerk user details and create
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    return null
  }
  
  const email = clerkUser.emailAddresses[0]?.emailAddress || null
  const name = clerkUser.firstName && clerkUser.lastName
    ? `${clerkUser.firstName} ${clerkUser.lastName}`
    : clerkUser.firstName || clerkUser.username || email?.split('@')[0] || 'User'
  
  // Check if a user with this email already exists (might be a guest user)
  if (email) {
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUserByEmail) {
      // Link existing user to Clerk account
      user = await prisma.user.update({
        where: { id: existingUserByEmail.id },
        data: { 
          clerkId,
          name: existingUserByEmail.name || name, // Keep existing name if set
          isGuest: false 
        }
      })
      return user
    }
  }
  
  // Create new user
  user = await prisma.user.create({
    data: {
      clerkId,
      name,
      email,
      isGuest: false
    }
  })
  
  return user
}

/**
 * Gets the current authenticated Clerk user ID without creating a database user.
 */
export async function getCurrentClerkUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}

