import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params
  try {
    const aggregation = await prisma.sessionPlayer.groupBy({
      by: ['userId'],
      where: {
        session: {
          groupId,
        },
      },
      _sum: {
        pointsAwarded: true,
      },
      _count: {
        sessionId: true,
      },
      _avg: {
        placement: true,
      },
    })

    const userIds = aggregation.map((a) => a.userId)
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
    })

    const leaderboard = aggregation
      .map((entry) => {
        const user = users.find((u) => u.id === entry.userId)
        return {
          userId: entry.userId,
          name: user?.name || 'Unknown',
          totalLeaguePoints: entry._sum.pointsAwarded || 0,
          gamesPlayed: entry._count.sessionId || 0,
          averagePlacement: entry._avg.placement || 0,
        }
      })
      .sort((a, b) => b.totalLeaguePoints - a.totalLeaguePoints)

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}

