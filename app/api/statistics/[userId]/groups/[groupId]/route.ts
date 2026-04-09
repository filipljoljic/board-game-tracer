import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string; groupId: string }> }
) {
  const { userId, groupId } = await params
  
  try {
    // Fetch user, group, and player sessions in parallel
    const [user, group, playerSessions] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.group.findUnique({ where: { id: groupId } }),
      prisma.sessionPlayer.findMany({
        where: { 
          userId,
          session: { groupId }
        },
        include: {
          session: {
            include: {
              game: true,
              players: true // Needed to determine player count for "Last"
            }
          }
        }
      })
    ])
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    const totalGames = playerSessions.length
    let wins = 0
    let second = 0
    let third = 0
    let last = 0
    
    // Game-specific stats
    const gameStats: Record<string, { name: string, played: number, wins: number, placements: number[], durations: number[] }> = {}
    const allDurations: number[] = []

    playerSessions.forEach(ps => {
        const gameName = ps.session.game.name
        const placement = ps.placement
        const playerCount = ps.session.players.length

        // Global counters
        if (placement === 1) wins++
        if (placement === 2) second++
        if (placement === 3) third++
        if (placement === playerCount && playerCount > 1) last++

        // Track durations
        if (ps.session.durationMinutes != null) {
            allDurations.push(ps.session.durationMinutes)
        }

        // Per-game stats
        if (!gameStats[gameName]) {
            gameStats[gameName] = { name: gameName, played: 0, wins: 0, placements: [], durations: [] }
        }
        gameStats[gameName].played++
        gameStats[gameName].placements.push(placement)
        if (placement === 1) gameStats[gameName].wins++
        if (ps.session.durationMinutes != null) {
            gameStats[gameName].durations.push(ps.session.durationMinutes)
        }
    })

    // Format for Pie Chart (1st, 2nd, 3rd, Other)
    const pieData = [
        { name: '1st', value: wins, fill: '#ffd700' }, // Gold
        { name: '2nd', value: second, fill: '#c0c0c0' }, // Silver
        { name: '3rd', value: third, fill: '#cd7f32' }, // Bronze
        { name: '4th+', value: Math.max(0, totalGames - wins - second - third), fill: '#94a3b8' } // Slate 400
    ].filter(d => d.value > 0)

    // Format Game Stats for Bar Chart
    const gamesData = Object.values(gameStats)
        .map(g => ({
            name: g.name,
            played: g.played,
            wins: g.wins,
            winRate: Math.round((g.wins / g.played) * 100),
            avgDuration: g.durations.length > 0
              ? Math.round(g.durations.reduce((a, b) => a + b, 0) / g.durations.length)
              : null
        }))
        .sort((a, b) => b.played - a.played)
        .slice(0, 10) // Top 10 games

    const averageDuration = allDurations.length > 0
      ? Math.round(allDurations.reduce((a, b) => a + b, 0) / allDurations.length)
      : null

    return NextResponse.json({
      user,
      group,
      totalGames,
      averageDuration,
      summary: { wins, second, third, last },
      pieData,
      gamesData
    })

  } catch {
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}
