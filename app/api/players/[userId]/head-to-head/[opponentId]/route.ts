import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string; opponentId: string }> }
) {
  const { userId, opponentId } = await params

  try {
    const [player, opponent] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true, username: true } }),
      prisma.user.findUnique({ where: { id: opponentId }, select: { id: true, name: true, username: true } }),
    ])

    if (!player || !opponent) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find all sessions where both players participated (2+ players)
    const playerSessions = await prisma.sessionPlayer.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            game: { select: { name: true } },
            players: { select: { userId: true, placement: true } },
          },
        },
      },
    })

    // Filter to sessions where opponent also played, and multiplayer only
    const sharedSessions = playerSessions
      .filter(sp =>
        sp.session.players.length >= 2 &&
        sp.session.players.some(p => p.userId === opponentId)
      )
      .sort((a, b) => new Date(a.session.playedAt).getTime() - new Date(b.session.playedAt).getTime())

    let playerWins = 0
    let opponentWins = 0
    let draws = 0
    const gameStats: Record<string, { gameName: string; playerWins: number; opponentWins: number; totalPlayed: number }> = {}

    // Current streak tracking
    let streakPlayer: string | null = null
    let streakCount = 0

    for (const sp of sharedSessions) {
      const playerPlacement = sp.placement
      const opponentPlayer = sp.session.players.find(p => p.userId === opponentId)
      if (!opponentPlayer) continue

      const opponentPlacement = opponentPlayer.placement
      const gameName = sp.session.game.name

      if (!gameStats[gameName]) {
        gameStats[gameName] = { gameName, playerWins: 0, opponentWins: 0, totalPlayed: 0 }
      }
      gameStats[gameName].totalPlayed++

      if (playerPlacement < opponentPlacement) {
        playerWins++
        gameStats[gameName].playerWins++
        if (streakPlayer === userId) {
          streakCount++
        } else {
          streakPlayer = userId
          streakCount = 1
        }
      } else if (opponentPlacement < playerPlacement) {
        opponentWins++
        gameStats[gameName].opponentWins++
        if (streakPlayer === opponentId) {
          streakCount++
        } else {
          streakPlayer = opponentId
          streakCount = 1
        }
      } else {
        draws++
        streakPlayer = null
        streakCount = 0
      }
    }

    // Most played game together
    const perGame = Object.values(gameStats).sort((a, b) => b.totalPlayed - a.totalPlayed)
    const mostPlayedGame = perGame[0] || null

    return NextResponse.json({
      player: { id: player.id, name: player.name || player.username },
      opponent: { id: opponent.id, name: opponent.name || opponent.username },
      totalGames: sharedSessions.length,
      playerWins,
      opponentWins,
      draws,
      currentStreak: streakPlayer ? { player: streakPlayer, count: streakCount } : null,
      mostPlayedGame: mostPlayedGame ? { name: mostPlayedGame.gameName, count: mostPlayedGame.totalPlayed } : null,
      perGame,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch head-to-head' }, { status: 500 })
  }
}
