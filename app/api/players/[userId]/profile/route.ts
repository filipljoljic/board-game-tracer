import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { computePlayerStats, computeAchievements } from '@/lib/achievements'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params

  try {
    const [user, groupMemberships, sessionPlayers] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, username: true, createdAt: true, seenAchievements: true },
      }),
      prisma.groupMember.findMany({
        where: { userId },
        include: { group: { select: { id: true, name: true } } },
      }),
      prisma.sessionPlayer.findMany({
        where: { userId },
        include: {
          session: {
            include: {
              game: { select: { name: true } },
              players: {
                select: { userId: true, placement: true, rawScore: true },
              },
            },
          },
        },
      }),
    ])

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Transform sessions for achievement computation
    const sessions = sessionPlayers.map(sp => ({
      id: sp.session.id,
      gameId: sp.session.gameId,
      playedAt: sp.session.playedAt,
      durationMinutes: sp.session.durationMinutes,
      players: sp.session.players,
    }))

    // Deduplicate sessions (user appears once per session)
    const uniqueSessions = Array.from(
      new Map(sessions.map(s => [s.id, s])).values()
    )

    const groups = groupMemberships.map(gm => gm.group)
    const stats = computePlayerStats(userId, uniqueSessions, groups.length)
    const achievements = computeAchievements(stats)

    const unlocked = achievements.filter(a => a.unlocked)
    const locked = achievements.filter(a => !a.unlocked)

    // Recent sessions (last 20, multiplayer only)
    const recentSessions = sessionPlayers
      .filter(sp => sp.session.players.length >= 2)
      .sort((a, b) => new Date(b.session.playedAt).getTime() - new Date(a.session.playedAt).getTime())
      .slice(0, 20)
      .map(sp => ({
        id: sp.session.id,
        gameName: sp.session.game.name,
        playedAt: sp.session.playedAt,
        placement: sp.placement,
        playerCount: sp.session.players.length,
        rawScore: sp.rawScore,
        durationMinutes: sp.session.durationMinutes,
      }))

    return NextResponse.json({
      user: { id: user.id, name: user.name, username: user.username, createdAt: user.createdAt },
      stats,
      achievements: {
        unlocked,
        locked,
        total: achievements.length,
        unlockedCount: unlocked.length,
      },
      recentSessions,
      groups,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}
