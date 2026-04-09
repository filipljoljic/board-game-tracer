import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

interface PlayerInput {
  userId: string
  rawScore: number
  placement: number
  pointsAwarded: number
  scoreDetails?: Record<string, number> | string
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { gameId, templateId, groupId, playedAt, durationMinutes, players } = body

    const newSession = await prisma.session.create({
      data: {
        gameId,
        templateId,
        groupId,
        playedAt: new Date(playedAt),
        durationMinutes: durationMinutes ?? null,
        players: {
          create: players.map((p: PlayerInput) => ({
            userId: p.userId,
            rawScore: p.rawScore,
            placement: p.placement,
            pointsAwarded: p.pointsAwarded,
            scoreDetails: typeof p.scoreDetails === 'object' ? JSON.stringify(p.scoreDetails) : p.scoreDetails,
          })),
        },
      },
      include: {
        players: {
          include: { user: true },
        },
        game: true,
      },
    })

    // Invalidate caches for instant visibility
    revalidateTag('sessions', 'max')
    revalidateTag(`group-${groupId}-sessions`, 'max')
    revalidateTag('statistics', 'max')
    revalidateTag(`group-${groupId}-leaderboard`, 'max')

    return NextResponse.json(newSession)
  } catch {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('groupId')

  try {
    const sessions = await prisma.session.findMany({
      where: groupId ? { groupId } : {},
      include: {
        game: true,
        players: {
          include: { user: true },
        },
      },
      orderBy: { playedAt: 'desc' },
    })
    
    // Cache for 15 minutes
    return NextResponse.json(sessions, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800'
      }
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

