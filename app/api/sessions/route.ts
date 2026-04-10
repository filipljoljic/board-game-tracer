import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { computePlayerStats, computeAchievements, getNewAchievements } from '@/lib/achievements'

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

    // Compute new achievements for the current user
    const newAchievements: Record<string, { id: string; name: string; description: string; icon: string; tier: string }[]> = {}

    if (players.length >= 2) {
      // Only compute for the session creator to avoid expensive queries for all players
      const currentUserId = session.user.id
      const [allUserSessions, userGroupCount, userData] = await Promise.all([
        prisma.sessionPlayer.findMany({
          where: { userId: currentUserId },
          include: {
            session: {
              include: { players: { select: { userId: true, placement: true, rawScore: true } } },
            },
          },
        }),
        prisma.groupMember.count({ where: { userId: currentUserId } }),
        prisma.user.findUnique({ where: { id: currentUserId }, select: { seenAchievements: true } }),
      ])

      const sessions = Array.from(
        new Map(allUserSessions.map(sp => [sp.session.id, {
          id: sp.session.id,
          gameId: sp.session.gameId,
          playedAt: sp.session.playedAt,
          durationMinutes: sp.session.durationMinutes,
          players: sp.session.players,
        }])).values()
      )

      const stats = computePlayerStats(currentUserId, sessions, userGroupCount)
      const achievements = computeAchievements(stats)
      const seen: string[] = userData?.seenAchievements ? JSON.parse(userData.seenAchievements) : []
      const freshAchievements = getNewAchievements(achievements, seen)

      if (freshAchievements.length > 0) {
        newAchievements[currentUserId] = freshAchievements.map(a => ({
          id: a.id, name: a.name, description: a.description, icon: a.icon, tier: a.tier,
        }))
      }
    }

    return NextResponse.json({ ...newSession, newAchievements })
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

