import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { randomBytes } from 'crypto'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        isGuest: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

/**
 * Create a guest user (for adding players to sessions who don't have accounts)
 */
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Generate a unique username for guest users
    const guestId = randomBytes(4).toString('hex')
    const username = `guest_${guestId}`

    // Guest users get a placeholder password hash (they can't login)
    const placeholderHash = 'GUEST_USER_NO_PASSWORD'

    const user = await prisma.user.create({
      data: {
        username,
        name,
        email: email || null,
        passwordHash: placeholderHash,
        isGuest: true
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        isGuest: true
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
