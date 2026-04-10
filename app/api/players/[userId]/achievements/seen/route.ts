import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params

  try {
    const session = await auth()
    if (!session?.user?.id || session.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { achievementIds } = await request.json()
    if (!Array.isArray(achievementIds)) {
      return NextResponse.json({ error: 'achievementIds must be an array' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { seenAchievements: true },
    })

    const existing: string[] = user?.seenAchievements ? JSON.parse(user.seenAchievements) : []
    const merged = [...new Set([...existing, ...achievementIds])]

    await prisma.user.update({
      where: { id: userId },
      data: { seenAchievements: JSON.stringify(merged) },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update seen achievements' }, { status: 500 })
  }
}
