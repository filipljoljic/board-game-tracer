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

/**
 * Get user's quick stats for home page dashboard
 * Cached for 30 min, instantly invalidated via 'statistics' tag
 */
export const getUserQuickStats = (userId: string) => unstable_cache(
  async () => {
    // Get all user's session players
    const sessionPlayers = await prisma.sessionPlayer.findMany({
      where: { userId },
      include: {
        session: {
          include: { game: true }
        }
      }
    })

    const totalSessions = sessionPlayers.length
    const wins = sessionPlayers.filter(sp => sp.placement === 1).length
    const winRate = totalSessions > 0 ? Math.round((wins / totalSessions) * 100) : 0

    // Find most played game
    const gamePlayCounts = sessionPlayers.reduce((acc, sp) => {
      const gameId = sp.session.gameId
      const gameName = sp.session.game.name
      if (!acc[gameId]) {
        acc[gameId] = { name: gameName, count: 0 }
      }
      acc[gameId].count++
      return acc
    }, {} as Record<string, { name: string; count: number }>)

    const mostPlayedGame = Object.values(gamePlayCounts).sort((a, b) => b.count - a.count)[0]?.name || 'N/A'

    return {
      totalSessions,
      wins,
      winRate,
      mostPlayedGame
    }
  },
  [`user-quick-stats-${userId}`],
  {
    revalidate: 1800, // 30 min
    tags: ['statistics', `user-${userId}-stats`]
  }
)()

/**
 * Get enriched user groups with member counts, session counts, last session, and leader
 * Cached for 30 min, instantly invalidated via 'groups' tag
 */
export const getEnrichedUserGroups = (userId: string) => unstable_cache(
  async () => {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        _count: {
          select: { 
            members: true,
            sessions: true 
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    // For each group, get the last session and current leader
    const enrichedGroups = await Promise.all(
      groups.map(async (group) => {
        // Get last session
        const lastSession = await prisma.session.findFirst({
          where: { groupId: group.id },
          orderBy: { playedAt: 'desc' },
          select: { playedAt: true }
        })

        // Get leaderboard to find leader
        const leaderboard = await prisma.sessionPlayer.groupBy({
          by: ['userId'],
          where: {
            session: { groupId: group.id }
          },
          _sum: {
            pointsAwarded: true
          }
        })

        const topPlayer = leaderboard.sort((a, b) => 
          (b._sum.pointsAwarded || 0) - (a._sum.pointsAwarded || 0)
        )[0]

        const leaderName = topPlayer ? await prisma.user.findUnique({
          where: { id: topPlayer.userId },
          select: { name: true, username: true }
        }).then(u => u?.name || u?.username || 'Unknown') : null

        return {
          ...group,
          lastPlayedAt: lastSession?.playedAt || null,
          leaderName: leaderName
        }
      })
    )

    return enrichedGroups
  },
  [`user-enriched-groups-${userId}`],
  {
    revalidate: 1800, // 30 min
    tags: ['groups', `user-${userId}-groups`, 'statistics']
  }
)()

/**
 * Get recent sessions across all user's groups
 * Cached for 15 min, instantly invalidated via 'sessions' tag
 */
export const getCachedRecentUserSessions = (userId: string) => unstable_cache(
  async () => {
    // Get all groups the user is a member of
    const userGroups = await prisma.groupMember.findMany({
      where: { userId },
      select: { groupId: true }
    })

    const groupIds = userGroups.map(g => g.groupId)

    // Get recent sessions from those groups
    return await prisma.session.findMany({
      where: {
        groupId: { in: groupIds }
      },
      include: {
        game: true,
        group: true,
        players: {
          include: { user: true },
          orderBy: { placement: 'asc' }
        }
      },
      orderBy: { playedAt: 'desc' },
      take: 10
    })
  },
  [`user-recent-sessions-${userId}`],
  {
    revalidate: 900, // 15 min
    tags: ['sessions', `user-${userId}-sessions`]
  }
)()
