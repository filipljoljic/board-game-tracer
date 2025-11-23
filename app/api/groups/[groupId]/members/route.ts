import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params
  try {
    const members = await prisma.groupMember.findMany({
      where: { groupId },
      include: { user: true },
    })
    return NextResponse.json(members.map((m) => m.user))
  } catch (error) {
    console.error('Failed to fetch group members:', error)
    return NextResponse.json({ error: 'Failed to fetch group members' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params
  try {
    const body = await request.json()
    const { userId } = body
    
    if (!userId) {
        return NextResponse.json({ error: 'UserId is required' }, { status: 400 })
    }

    const existing = await prisma.groupMember.findFirst({
        where: { groupId, userId }
    })

    if (existing) {
        return NextResponse.json({ error: 'User is already a member' }, { status: 409 })
    }

    const member = await prisma.groupMember.create({
        data: {
            groupId,
            userId,
            role: 'MEMBER' 
        },
        include: { user: true }
    })

    return NextResponse.json(member.user)

  } catch (error) {
    console.error('Failed to add group member:', error)
    return NextResponse.json({ error: 'Failed to add group member' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
    const { groupId } = await params
    try {
        const body = await request.json()
        const { userId } = body

        if (!userId) {
            return NextResponse.json({ error: 'UserId is required' }, { status: 400 })
        }

        await prisma.groupMember.deleteMany({
            where: {
                groupId,
                userId
            }
        })
        
        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Failed to remove group member:', error)
        return NextResponse.json({ error: 'Failed to remove group member' }, { status: 500 })
    }
}

