import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { userId: session.user.id }
        }
      }
    })
    return NextResponse.json(groups)
  } catch (error) {
    console.error('Failed to fetch groups:', error)
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, memberIds = [] } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // Filter out the creator from memberIds if they included themselves
    const otherMemberIds = memberIds.filter((id: string) => id !== session.user.id)

    const group = await prisma.group.create({
      data: { 
        name,
        members: {
          create: [
            // Creator is always ADMIN
            { userId: session.user.id, role: 'ADMIN' },
            // Other selected members are MEMBER
            ...otherMemberIds.map((id: string) => ({ userId: id, role: 'MEMBER' }))
          ]
        }
      },
      include: {
        members: {
          include: { user: true }
        }
      }
    })
    return NextResponse.json(group)
  } catch (error) {
    console.error('Failed to create group:', error)
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 })
  }
}

