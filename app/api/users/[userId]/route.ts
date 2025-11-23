import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  try {
    const sessionCount = await prisma.sessionPlayer.count({ where: { userId } })
    if (sessionCount > 0) {
       return NextResponse.json({ error: 'Cannot delete user with associated sessions' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id: userId },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}

