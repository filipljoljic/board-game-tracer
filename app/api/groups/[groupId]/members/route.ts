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

