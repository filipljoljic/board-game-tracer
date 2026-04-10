import { describe, it, expect } from 'vitest'
import { computePlayerStats, computeAchievements, getNewAchievements, ACHIEVEMENT_DEFINITIONS } from './achievements'

function makeSession(overrides: {
  id?: string
  gameId?: string
  playedAt?: string
  durationMinutes?: number | null
  players: { userId: string; placement: number; rawScore: number }[]
}) {
  return {
    id: overrides.id || `session-${Math.random()}`,
    gameId: overrides.gameId || 'game-1',
    playedAt: overrides.playedAt || '2026-01-15T20:00:00Z',
    durationMinutes: overrides.durationMinutes ?? null,
    players: overrides.players,
  }
}

describe('computePlayerStats', () => {
  const userId = 'user-1'

  it('should return zero stats for no sessions', () => {
    const stats = computePlayerStats(userId, [], 1)
    expect(stats.totalGames).toBe(0)
    expect(stats.wins).toBe(0)
    expect(stats.winRate).toBe(0)
    expect(stats.bestStreak).toBe(0)
    expect(stats.currentStreak).toBe(0)
    expect(stats.uniqueGames).toBe(0)
    expect(stats.uniqueOpponents).toBe(0)
  })

  it('should filter out solo sessions (1 player)', () => {
    const sessions = [
      makeSession({ players: [{ userId, placement: 1, rawScore: 10 }] }),
      makeSession({ players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'user-2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.totalGames).toBe(1) // only the 2-player session
  })

  it('should count wins correctly', () => {
    const sessions = [
      makeSession({ id: 's1', playedAt: '2026-01-01T10:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's2', playedAt: '2026-01-02T10:00:00Z', players: [{ userId, placement: 2, rawScore: 5 }, { userId: 'u2', placement: 1, rawScore: 10 }] }),
      makeSession({ id: 's3', playedAt: '2026-01-03T10:00:00Z', players: [{ userId, placement: 1, rawScore: 15 }, { userId: 'u2', placement: 2, rawScore: 8 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.totalGames).toBe(3)
    expect(stats.wins).toBe(2)
    expect(stats.winRate).toBe(67)
  })

  it('should compute streaks correctly', () => {
    const sessions = [
      makeSession({ id: 's1', playedAt: '2026-01-01T10:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's2', playedAt: '2026-01-02T10:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's3', playedAt: '2026-01-03T10:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's4', playedAt: '2026-01-04T10:00:00Z', players: [{ userId, placement: 2, rawScore: 5 }, { userId: 'u2', placement: 1, rawScore: 10 }] }),
      makeSession({ id: 's5', playedAt: '2026-01-05T10:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.bestStreak).toBe(3)
    expect(stats.currentStreak).toBe(1) // last session is a win
  })

  it('should count unique games and opponents', () => {
    const sessions = [
      makeSession({ id: 's1', gameId: 'catan', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's2', gameId: 'wingspan', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u3', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's3', gameId: 'catan', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }, { userId: 'u4', placement: 3, rawScore: 3 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 2)
    expect(stats.uniqueGames).toBe(2)
    expect(stats.uniqueOpponents).toBe(3) // u2, u3, u4
    expect(stats.groupCount).toBe(2)
  })

  it('should track max opponent games for rivalry', () => {
    const sessions = Array.from({ length: 5 }, (_, i) =>
      makeSession({ id: `s${i}`, players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'rival', placement: 2, rawScore: 5 }] })
    )
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.maxOpponentGames).toBe(5)
  })

  it('should count highest score achievements', () => {
    const sessions = [
      makeSession({ id: 's1', players: [{ userId, placement: 1, rawScore: 20 }, { userId: 'u2', placement: 2, rawScore: 10 }] }),
      makeSession({ id: 's2', players: [{ userId, placement: 2, rawScore: 10 }, { userId: 'u2', placement: 1, rawScore: 20 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.highestScoreCount).toBe(1)
  })

  it('should detect comeback wins', () => {
    const sessions = [
      makeSession({ id: 's1', gameId: 'catan', playedAt: '2026-01-01T10:00:00Z', players: [{ userId, placement: 2, rawScore: 5 }, { userId: 'u2', placement: 1, rawScore: 10 }] }),
      makeSession({ id: 's2', gameId: 'catan', playedAt: '2026-01-02T10:00:00Z', players: [{ userId, placement: 1, rawScore: 15 }, { userId: 'u2', placement: 2, rawScore: 8 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.comebackWins).toBe(1)
  })

  it('should compute duration stats', () => {
    const sessions = [
      makeSession({ id: 's1', durationMinutes: 45, players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's2', durationMinutes: 200, players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's3', durationMinutes: null, players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.longestSessionMinutes).toBe(200)
    expect(stats.shortestSessionMinutes).toBe(45)
    expect(stats.averageDuration).toBe(123) // (45+200)/2
  })

  it('should detect night owl sessions', () => {
    const sessions = [
      makeSession({ id: 's1', playedAt: '2026-01-15T23:30:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.hasNightSession).toBe(true)
  })

  it('should not detect night owl for daytime sessions', () => {
    const sessions = [
      makeSession({ id: 's1', playedAt: '2026-01-15T14:00:00Z', players: [{ userId, placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats(userId, sessions, 1)
    expect(stats.hasNightSession).toBe(false)
  })
})

describe('computeAchievements', () => {
  it('should return all achievement definitions', () => {
    const stats = computePlayerStats('u1', [], 0)
    const achievements = computeAchievements(stats)
    expect(achievements.length).toBe(ACHIEVEMENT_DEFINITIONS.length)
  })

  it('should unlock first_steps after 1 game', () => {
    const sessions = [
      makeSession({ players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    const firstSteps = achievements.find(a => a.id === 'first_steps')
    expect(firstSteps?.unlocked).toBe(true)
  })

  it('should unlock first_victory after winning', () => {
    const sessions = [
      makeSession({ players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'first_victory')?.unlocked).toBe(true)
  })

  it('should not unlock first_victory without a win', () => {
    const sessions = [
      makeSession({ players: [{ userId: 'u1', placement: 2, rawScore: 5 }, { userId: 'u2', placement: 1, rawScore: 10 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'first_victory')?.unlocked).toBe(false)
  })

  it('should unlock explorer after 3 unique games', () => {
    const sessions = [
      makeSession({ id: 's1', gameId: 'g1', players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's2', gameId: 'g2', players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
      makeSession({ id: 's3', gameId: 'g3', players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'explorer')?.unlocked).toBe(true)
  })

  it('should unlock team_player with 2+ groups', () => {
    const stats = computePlayerStats('u1', [], 2)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'team_player')?.unlocked).toBe(true)
  })

  it('should unlock unbeatable with 70%+ win rate and 10+ games', () => {
    const sessions = Array.from({ length: 10 }, (_, i) =>
      makeSession({
        id: `s${i}`,
        playedAt: `2026-01-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
        players: [
          { userId: 'u1', placement: i < 8 ? 1 : 2, rawScore: i < 8 ? 10 : 5 },
          { userId: 'u2', placement: i < 8 ? 2 : 1, rawScore: i < 8 ? 5 : 10 },
        ],
      })
    )
    const stats = computePlayerStats('u1', sessions, 1)
    expect(stats.winRate).toBe(80)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'unbeatable')?.unlocked).toBe(true)
  })

  it('should not unlock unbeatable with fewer than 10 games even with high win rate', () => {
    const sessions = Array.from({ length: 5 }, (_, i) =>
      makeSession({
        id: `s${i}`,
        players: [
          { userId: 'u1', placement: 1, rawScore: 10 },
          { userId: 'u2', placement: 2, rawScore: 5 },
        ],
      })
    )
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'unbeatable')?.unlocked).toBe(false)
  })

  it('should unlock marathon with 3+ hour session', () => {
    const sessions = [
      makeSession({ durationMinutes: 200, players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'marathon')?.unlocked).toBe(true)
  })

  it('should unlock speed_demon with sub-30min session', () => {
    const sessions = [
      makeSession({ durationMinutes: 20, players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    expect(achievements.find(a => a.id === 'speed_demon')?.unlocked).toBe(true)
  })

  it('should track progress correctly for locked achievements', () => {
    const sessions = Array.from({ length: 3 }, (_, i) =>
      makeSession({
        id: `s${i}`,
        players: [
          { userId: 'u1', placement: 1, rawScore: 10 },
          { userId: 'u2', placement: 2, rawScore: 5 },
        ],
      })
    )
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    const gettingStarted = achievements.find(a => a.id === 'getting_started')
    expect(gettingStarted?.unlocked).toBe(false)
    expect(gettingStarted?.progress).toEqual({ current: 3, target: 5 })
  })
})

describe('getNewAchievements', () => {
  it('should return newly unlocked achievements not in seen list', () => {
    const sessions = [
      makeSession({ players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    const newOnes = getNewAchievements(achievements, [])
    expect(newOnes.length).toBeGreaterThan(0)
    expect(newOnes.every(a => a.unlocked)).toBe(true)
  })

  it('should exclude already seen achievements', () => {
    const sessions = [
      makeSession({ players: [{ userId: 'u1', placement: 1, rawScore: 10 }, { userId: 'u2', placement: 2, rawScore: 5 }] }),
    ]
    const stats = computePlayerStats('u1', sessions, 1)
    const achievements = computeAchievements(stats)
    const allUnlocked = achievements.filter(a => a.unlocked).map(a => a.id)
    const newOnes = getNewAchievements(achievements, allUnlocked)
    expect(newOnes.length).toBe(0)
  })

  it('should not return locked achievements', () => {
    const stats = computePlayerStats('u1', [], 0)
    const achievements = computeAchievements(stats)
    const newOnes = getNewAchievements(achievements, [])
    expect(newOnes.length).toBe(0)
  })
})
