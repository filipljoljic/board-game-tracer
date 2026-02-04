import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/db'

/**
 * Server-side caching utilities following Vercel best practices
 * 
 * Two complementary strategies:
 * 1. React.cache() - Per-request deduplication (within a single request)
 * 2. unstable_cache() - Cross-request caching with tags (across multiple requests)
 */

// ============================================================================
// React.cache() - Per-request deduplication
// ============================================================================
// Use primitive arguments (strings, numbers) NOT objects for cache hits
// Multiple components in the same request calling the same function = 1 DB query

/**
 * Get a single game by ID with templates
 * Deduplicated within a request using React.cache
 */
export const getGame = cache(async (gameId: string) => {
  return await prisma.game.findUnique({
    where: { id: gameId },
    include: { templates: true }
  })
})

/**
 * Get group with members
 * Deduplicated within a request using React.cache
 */
export const getGroup = cache(async (groupId: string) => {
  return await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      members: {
        include: { user: true }
      }
    }
  })
})

/**
 * Get session with full details
 * Deduplicated within a request using React.cache
 */
export const getSession = cache(async (sessionId: string) => {
  return await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      game: true,
      group: true,
      players: {
        include: { user: true },
        orderBy: { placement: 'asc' }
      }
    }
  })
})

// ============================================================================
// unstable_cache() - Cross-request caching with tags
// ============================================================================
// Caches across requests with tag-based invalidation
// Long TTLs (1 hour) are safe because we invalidate on mutations

/**
 * Get all games with session counts
 * Cached for 1 hour, instantly invalidated via 'games' tag
 */
export const getCachedGames = unstable_cache(
  async () => {
    return await prisma.game.findMany({
      include: {
        _count: {
          select: { sessions: true }
        }
      },
      orderBy: { name: 'asc' }
    })
  },
  ['games-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['games'] 
  }
)

/**
 * Get game with templates and session count
 * Cached for 1 hour, instantly invalidated via 'games' tag
 */
export const getCachedGame = (gameId: string) => unstable_cache(
  async () => {
    return await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        templates: true,
        _count: {
          select: { sessions: true }
        }
      }
    })
  },
  [`game-${gameId}`],
  {
    revalidate: 3600, // 1 hour
    tags: ['games', `game-${gameId}`]
  }
)()

/**
 * Get user's groups with member counts
 * Cached for 30 min, instantly invalidated via 'groups' tag
 */
export const getCachedUserGroups = (userId: string) => unstable_cache(
  async () => {
    return await prisma.group.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        _count: {
          select: { members: true }
        }
      },
      orderBy: { name: 'asc' }
    })
  },
  [`user-groups-${userId}`],
  {
    revalidate: 1800, // 30 min
    tags: ['groups', `user-${userId}-groups`]
  }
)()

/**
 * Get group leaderboard
 * Cached for 30 min, instantly invalidated via 'statistics' tag
 */
export const getCachedGroupLeaderboard = (groupId: string) => unstable_cache(
  async () => {
    const leaderboard = await prisma.sessionPlayer.groupBy({
      by: ['userId'],
      where: {
        session: { groupId }
      },
      _sum: {
        pointsAwarded: true
      },
      _avg: {
        placement: true
      },
      _count: {
        sessionId: true
      }
    })

    // Fetch user details
    const userIds = leaderboard.map(l => l.userId)
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true }
    })

    // Combine data
    return leaderboard
      .map(l => {
        const user = users.find(u => u.id === l.userId)
        return {
          userId: l.userId,
          userName: user?.name || 'Unknown',
          totalPoints: l._sum.pointsAwarded || 0,
          averagePlacement: l._avg.placement || 0,
          gamesPlayed: l._count.sessionId
        }
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
  },
  [`group-leaderboard-${groupId}`],
  {
    revalidate: 1800, // 30 min
    tags: ['statistics', `group-${groupId}-leaderboard`]
  }
)()

/**
 * Get group sessions history
 * Cached for 15 min, instantly invalidated via 'sessions' tag
 */
export const getCachedGroupSessions = (groupId: string) => unstable_cache(
  async () => {
    return await prisma.session.findMany({
      where: { groupId },
      include: {
        game: true,
        players: {
          include: { user: true },
          orderBy: { placement: 'asc' }
        }
      },
      orderBy: { playedAt: 'desc' },
      take: 20
    })
  },
  [`group-sessions-${groupId}`],
  {
    revalidate: 900, // 15 min
    tags: ['sessions', `group-${groupId}-sessions`]
  }
)()
