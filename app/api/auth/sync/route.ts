import { NextResponse } from 'next/server'
import { getOrCreateCurrentUser } from '@/lib/auth'

/**
 * POST /api/auth/sync
 * Syncs the current Clerk user to the database.
 * Called automatically when a user signs in.
 */
export async function POST() {
  try {
    const user = await getOrCreateCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Failed to sync user:', error)
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
  }
}

/**
 * GET /api/auth/sync
 * Gets the current synced user from the database.
 */
export async function GET() {
  try {
    const user = await getOrCreateCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    return NextResponse.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Failed to get user:', error)
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
  }
}

