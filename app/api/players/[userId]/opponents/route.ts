import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params

  try {
    // Find all sessions the user played in (multiplayer only)
    const userSessions = await prisma.sessionPlayer.findMany({
      where: { userId },
      select: {
        session: {
          select: {
            players: {
              select: { userId: true },
            },
          },
        },
      },
    })

    // Collect unique opponent IDs
    const opponentIds = new Set<string>()
    userSessions.forEach(sp => {
      if (sp.session.players.length >= 2) {
        sp.session.players.forEach(p => {
          if (p.userId !== userId) opponentIds.add(p.userId)
        })
      }
    })

    if (opponentIds.size === 0) {
      return NextResponse.json([])
    }

    const opponents = await prisma.user.findMany({
      where: { id: { in: [...opponentIds] } },
      select: { id: true, name: true, username: true },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(
      opponents.map(o => ({ id: o.id, name: o.name || o.username }))
    )
  } catch {
    return NextResponse.json({ error: 'Failed to fetch opponents' }, { status: 500 })
  }
}
