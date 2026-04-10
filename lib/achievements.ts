export type AchievementTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface AchievementDefinition {
  id: string
  name: string
  description: string
  icon: string
  tier: AchievementTier
  check: (stats: PlayerStats) => boolean
  progress: (stats: PlayerStats) => { current: number; target: number }
}

export interface PlayerStats {
  totalGames: number
  wins: number
  winRate: number
  bestStreak: number
  currentStreak: number
  uniqueGames: number
  uniqueOpponents: number
  groupCount: number
  maxOpponentGames: number // most games against a single opponent
  highestScoreCount: number // times player had highest raw score in a session
  comebackWins: number
  longestSessionMinutes: number
  shortestSessionMinutes: number
  hasNightSession: boolean
  averageDuration: number | null
}

export interface ComputedAchievement {
  id: string
  name: string
  description: string
  icon: string
  tier: AchievementTier
  unlocked: boolean
  progress: { current: number; target: number }
}

export const TIER_COLORS: Record<AchievementTier, string> = {
  common: 'bg-gray-100 text-gray-600 border-gray-300',
  uncommon: 'bg-green-50 text-green-700 border-green-300',
  rare: 'bg-blue-50 text-blue-700 border-blue-300',
  epic: 'bg-purple-50 text-purple-700 border-purple-300',
  legendary: 'bg-yellow-50 text-yellow-700 border-yellow-400',
}

export const TIER_BADGE_COLORS: Record<AchievementTier, string> = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // Milestone Achievements
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Play your first game',
    icon: 'Footprints',
    tier: 'common',
    check: (s) => s.totalGames >= 1,
    progress: (s) => ({ current: Math.min(s.totalGames, 1), target: 1 }),
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Play 5 games',
    icon: 'Sprout',
    tier: 'common',
    check: (s) => s.totalGames >= 5,
    progress: (s) => ({ current: Math.min(s.totalGames, 5), target: 5 }),
  },
  {
    id: 'regular',
    name: 'Regular',
    description: 'Play 25 games',
    icon: 'Calendar',
    tier: 'uncommon',
    check: (s) => s.totalGames >= 25,
    progress: (s) => ({ current: Math.min(s.totalGames, 25), target: 25 }),
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Play 50 games',
    icon: 'Flame',
    tier: 'rare',
    check: (s) => s.totalGames >= 50,
    progress: (s) => ({ current: Math.min(s.totalGames, 50), target: 50 }),
  },
  {
    id: 'veteran',
    name: 'Veteran',
    description: 'Play 100 games',
    icon: 'Medal',
    tier: 'epic',
    check: (s) => s.totalGames >= 100,
    progress: (s) => ({ current: Math.min(s.totalGames, 100), target: 100 }),
  },
  {
    id: 'legend',
    name: 'Legend',
    description: 'Play 250 games',
    icon: 'Crown',
    tier: 'legendary',
    check: (s) => s.totalGames >= 250,
    progress: (s) => ({ current: Math.min(s.totalGames, 250), target: 250 }),
  },

  // Winning Achievements
  {
    id: 'first_victory',
    name: 'First Victory',
    description: 'Win your first game',
    icon: 'Trophy',
    tier: 'common',
    check: (s) => s.wins >= 1,
    progress: (s) => ({ current: Math.min(s.wins, 1), target: 1 }),
  },
  {
    id: 'streak_3',
    name: 'Winning Streak x3',
    description: 'Win 3 games in a row',
    icon: 'Zap',
    tier: 'uncommon',
    check: (s) => s.bestStreak >= 3,
    progress: (s) => ({ current: Math.min(s.bestStreak, 3), target: 3 }),
  },
  {
    id: 'streak_5',
    name: 'Winning Streak x5',
    description: 'Win 5 games in a row',
    icon: 'Flame',
    tier: 'rare',
    check: (s) => s.bestStreak >= 5,
    progress: (s) => ({ current: Math.min(s.bestStreak, 5), target: 5 }),
  },
  {
    id: 'streak_10',
    name: 'Winning Streak x10',
    description: 'Win 10 games in a row',
    icon: 'Rocket',
    tier: 'legendary',
    check: (s) => s.bestStreak >= 10,
    progress: (s) => ({ current: Math.min(s.bestStreak, 10), target: 10 }),
  },
  {
    id: 'dominant',
    name: 'Dominant',
    description: 'Win 10 games total',
    icon: 'Sword',
    tier: 'uncommon',
    check: (s) => s.wins >= 10,
    progress: (s) => ({ current: Math.min(s.wins, 10), target: 10 }),
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Win 50 games total',
    icon: 'Crown',
    tier: 'rare',
    check: (s) => s.wins >= 50,
    progress: (s) => ({ current: Math.min(s.wins, 50), target: 50 }),
  },
  {
    id: 'unbeatable',
    name: 'Unbeatable',
    description: '70%+ win rate (min 10 games)',
    icon: 'Shield',
    tier: 'epic',
    check: (s) => s.totalGames >= 10 && s.winRate >= 70,
    progress: (s) => ({ current: s.totalGames >= 10 ? Math.min(Math.round(s.winRate), 70) : 0, target: 70 }),
  },

  // Variety Achievements
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Play 3 different games',
    icon: 'Compass',
    tier: 'common',
    check: (s) => s.uniqueGames >= 3,
    progress: (s) => ({ current: Math.min(s.uniqueGames, 3), target: 3 }),
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Play 10 different games',
    icon: 'Library',
    tier: 'uncommon',
    check: (s) => s.uniqueGames >= 10,
    progress: (s) => ({ current: Math.min(s.uniqueGames, 10), target: 10 }),
  },
  {
    id: 'connoisseur',
    name: 'Connoisseur',
    description: 'Play 25 different games',
    icon: 'Gem',
    tier: 'rare',
    check: (s) => s.uniqueGames >= 25,
    progress: (s) => ({ current: Math.min(s.uniqueGames, 25), target: 25 }),
  },

  // Social Achievements
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Be in 2 or more groups',
    icon: 'Users',
    tier: 'common',
    check: (s) => s.groupCount >= 2,
    progress: (s) => ({ current: Math.min(s.groupCount, 2), target: 2 }),
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Play with 10 different opponents',
    icon: 'HeartHandshake',
    tier: 'uncommon',
    check: (s) => s.uniqueOpponents >= 10,
    progress: (s) => ({ current: Math.min(s.uniqueOpponents, 10), target: 10 }),
  },
  {
    id: 'rivalry',
    name: 'Rivalry',
    description: 'Play 10+ games against the same player',
    icon: 'Swords',
    tier: 'rare',
    check: (s) => s.maxOpponentGames >= 10,
    progress: (s) => ({ current: Math.min(s.maxOpponentGames, 10), target: 10 }),
  },

  // Special Achievements
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Have the highest score in a session 5 times',
    icon: 'Target',
    tier: 'uncommon',
    check: (s) => s.highestScoreCount >= 5,
    progress: (s) => ({ current: Math.min(s.highestScoreCount, 5), target: 5 }),
  },
  {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Win after placing last in a previous session of the same game',
    icon: 'RotateCcw',
    tier: 'rare',
    check: (s) => s.comebackWins >= 1,
    progress: (s) => ({ current: Math.min(s.comebackWins, 1), target: 1 }),
  },
  {
    id: 'marathon',
    name: 'Marathon',
    description: 'Play a session lasting 3+ hours',
    icon: 'Timer',
    tier: 'uncommon',
    check: (s) => s.longestSessionMinutes >= 180,
    progress: (s) => ({ current: Math.min(s.longestSessionMinutes, 180), target: 180 }),
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Play a session under 30 minutes',
    icon: 'Zap',
    tier: 'common',
    check: (s) => s.shortestSessionMinutes > 0 && s.shortestSessionMinutes <= 30,
    progress: (s) => ({ current: s.shortestSessionMinutes > 0 && s.shortestSessionMinutes <= 30 ? 1 : 0, target: 1 }),
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Play a session that started after 10 PM',
    icon: 'Moon',
    tier: 'common',
    check: (s) => s.hasNightSession,
    progress: (s) => ({ current: s.hasNightSession ? 1 : 0, target: 1 }),
  },
]

interface SessionForAchievements {
  id: string
  gameId: string
  playedAt: Date | string
  durationMinutes: number | null
  players: {
    userId: string
    placement: number
    rawScore: number
  }[]
}

export function computePlayerStats(userId: string, sessions: SessionForAchievements[], groupCount: number): PlayerStats {
  // Filter: only multiplayer sessions (2+ players)
  const multiplayer = sessions.filter(s => s.players.length >= 2)

  // Sort by date
  const sorted = multiplayer.toSorted((a, b) =>
    new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime()
  )

  const totalGames = sorted.length
  const wins = sorted.filter(s => {
    const p = s.players.find(p => p.userId === userId)
    return p?.placement === 1
  }).length
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0

  // Unique games & opponents
  const uniqueGames = new Set(sorted.map(s => s.gameId)).size
  const opponentCounts: Record<string, number> = {}
  sorted.forEach(s => {
    s.players.forEach(p => {
      if (p.userId !== userId) {
        opponentCounts[p.userId] = (opponentCounts[p.userId] || 0) + 1
      }
    })
  })
  const uniqueOpponents = Object.keys(opponentCounts).length
  const maxOpponentGames = Object.values(opponentCounts).length > 0
    ? Math.max(...Object.values(opponentCounts))
    : 0

  // Streaks
  let bestStreak = 0
  let tempStreak = 0
  for (const s of sorted) {
    const p = s.players.find(p => p.userId === userId)
    if (p?.placement === 1) {
      tempStreak++
      bestStreak = Math.max(bestStreak, tempStreak)
    } else {
      tempStreak = 0
    }
  }
  const currentStreak = tempStreak

  // Highest score count
  let highestScoreCount = 0
  sorted.forEach(s => {
    const userPlayer = s.players.find(p => p.userId === userId)
    if (!userPlayer) return
    const maxScore = Math.max(...s.players.map(p => p.rawScore))
    if (userPlayer.rawScore === maxScore && s.players.filter(p => p.rawScore === maxScore).length === 1) {
      highestScoreCount++
    }
  })

  // Comeback wins: won after placing last in a previous session of the same game
  let comebackWins = 0
  const lastPlaceGames = new Set<string>()
  for (const s of sorted) {
    const userPlayer = s.players.find(p => p.userId === userId)
    if (!userPlayer) continue
    const playerCount = s.players.length
    if (userPlayer.placement === 1 && lastPlaceGames.has(s.gameId)) {
      comebackWins++
    }
    if (userPlayer.placement === playerCount && playerCount > 1) {
      lastPlaceGames.add(s.gameId)
    }
  }

  // Duration-based stats
  const durationsMinutes = sorted
    .map(s => s.durationMinutes)
    .filter((d): d is number => d != null && d > 0)
  const longestSessionMinutes = durationsMinutes.length > 0 ? Math.max(...durationsMinutes) : 0
  const shortestSessionMinutes = durationsMinutes.length > 0 ? Math.min(...durationsMinutes) : 0
  const averageDuration = durationsMinutes.length > 0
    ? Math.round(durationsMinutes.reduce((a, b) => a + b, 0) / durationsMinutes.length)
    : null

  // Night owl check
  const hasNightSession = sorted.some(s => {
    const hour = new Date(s.playedAt).getHours()
    return hour >= 22 || hour < 4
  })

  return {
    totalGames,
    wins,
    winRate,
    bestStreak,
    currentStreak,
    uniqueGames,
    uniqueOpponents,
    groupCount,
    maxOpponentGames,
    highestScoreCount,
    comebackWins,
    longestSessionMinutes,
    shortestSessionMinutes,
    hasNightSession,
    averageDuration,
  }
}

export function computeAchievements(stats: PlayerStats): ComputedAchievement[] {
  return ACHIEVEMENT_DEFINITIONS.map(def => ({
    id: def.id,
    name: def.name,
    description: def.description,
    icon: def.icon,
    tier: def.tier,
    unlocked: def.check(stats),
    progress: def.progress(stats),
  }))
}

export function getNewAchievements(
  achievements: ComputedAchievement[],
  seenAchievements: string[]
): ComputedAchievement[] {
  return achievements.filter(a => a.unlocked && !seenAchievements.includes(a.id))
}
