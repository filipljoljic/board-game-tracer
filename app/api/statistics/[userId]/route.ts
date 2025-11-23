import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const playerSessions = await prisma.sessionPlayer.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            game: true,
            players: true // Needed to determine player count for "Last"
          }
        }
      }
    })

    const totalGames = playerSessions.length
    let wins = 0
    let second = 0
    let third = 0
    let last = 0
    
    // Game-specific stats
    const gameStats: Record<string, { name: string, played: number, wins: number, placements: number[] }> = {}

    playerSessions.forEach(ps => {
        const gameName = ps.session.game.name
        const placement = ps.placement
        const playerCount = ps.session.players.length
        
        // Global counters
        if (placement === 1) wins++
        if (placement === 2) second++
        if (placement === 3) third++
        if (placement === playerCount && playerCount > 1) last++

        // Per-game stats
        if (!gameStats[gameName]) {
            gameStats[gameName] = { name: gameName, played: 0, wins: 0, placements: [] }
        }
        gameStats[gameName].played++
        gameStats[gameName].placements.push(placement)
        if (placement === 1) gameStats[gameName].wins++
    })

    // Format for Pie Chart (1st, 2nd, 3rd, Other)
    // Note: "Last" is a separate metric, not necessarily mutually exclusive with 2nd/3rd (e.g. 2 player game, 2nd is last)
    // For the Pie Chart, we usually want mutually exclusive.
    // Let's do: 1st, 2nd, 3rd, 4th+
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
            winRate: Math.round((g.wins / g.played) * 100)
        }))
        .sort((a, b) => b.played - a.played)
        .slice(0, 10) // Top 10 games

    return NextResponse.json({
      user,
      totalGames,
      summary: { wins, second, third, last },
      pieData,
      gamesData
    })

  } catch (error) {
    console.error('Failed to fetch statistics:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}

