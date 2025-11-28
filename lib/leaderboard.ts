/**
 * Player statistics for leaderboard
 */
export type PlayerStats = {
  userId: string;
  userName: string;
  totalPoints: number;
  gamesPlayed: number;
  wins: number;
  secondPlace: number;
  thirdPlace: number;
  lastPlace: number;
  averagePoints: number;
  winRate: number;
};

/**
 * Session data for aggregation
 */
export type SessionData = {
  userId: string;
  userName: string;
  pointsAwarded: number;
  placement: number;
  totalPlayers: number;
};

/**
 * Aggregate player statistics from session data
 */
export function aggregatePlayerStats(
  sessions: SessionData[]
): Map<string, PlayerStats> {
  const statsMap = new Map<string, PlayerStats>();

  for (const session of sessions) {
    const existing = statsMap.get(session.userId);

    if (!existing) {
      statsMap.set(session.userId, {
        userId: session.userId,
        userName: session.userName,
        totalPoints: session.pointsAwarded,
        gamesPlayed: 1,
        wins: session.placement === 1 ? 1 : 0,
        secondPlace: session.placement === 2 ? 1 : 0,
        thirdPlace: session.placement === 3 ? 1 : 0,
        lastPlace: session.placement === session.totalPlayers ? 1 : 0,
        averagePoints: session.pointsAwarded,
        winRate: session.placement === 1 ? 100 : 0,
      });
    } else {
      existing.totalPoints += session.pointsAwarded;
      existing.gamesPlayed += 1;

      if (session.placement === 1) existing.wins += 1;
      if (session.placement === 2) existing.secondPlace += 1;
      if (session.placement === 3) existing.thirdPlace += 1;
      if (session.placement === session.totalPlayers) existing.lastPlace += 1;

      existing.averagePoints = existing.totalPoints / existing.gamesPlayed;
      existing.winRate = (existing.wins / existing.gamesPlayed) * 100;
    }
  }

  return statsMap;
}

/**
 * Sort leaderboard by total points (descending)
 */
export function sortLeaderboard(players: PlayerStats[]): PlayerStats[] {
  return [...players].sort((a, b) => {
    // Primary: total points (descending)
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    // Secondary: games played (fewer games = higher rank if tied on points)
    if (a.gamesPlayed !== b.gamesPlayed) {
      return a.gamesPlayed - b.gamesPlayed;
    }

    // Tertiary: wins (more wins = higher rank)
    return b.wins - a.wins;
  });
}

/**
 * Calculate win rate for a user
 */
export function calculateWinRate(
  userId: string,
  sessions: SessionData[]
): number {
  const userSessions = sessions.filter((s) => s.userId === userId);

  if (userSessions.length === 0) {
    return 0;
  }

  const wins = userSessions.filter((s) => s.placement === 1).length;
  return (wins / userSessions.length) * 100;
}

/**
 * Get top N players from leaderboard
 */
export function getTopPlayers(
  players: PlayerStats[],
  limit: number = 10
): PlayerStats[] {
  const sorted = sortLeaderboard(players);
  return sorted.slice(0, limit);
}

/**
 * Filter sessions by date range
 */
export function filterSessionsByDateRange(
  sessions: SessionData[],
  startDate?: Date,
  endDate?: Date
): SessionData[] {
  // This would need playedAt date in SessionData, but keeping the signature for completeness
  return sessions;
}

/**
 * Calculate player rank (1-based)
 */
export function calculatePlayerRank(
  userId: string,
  players: PlayerStats[]
): number {
  const sorted = sortLeaderboard(players);
  const index = sorted.findIndex((p) => p.userId === userId);
  return index === -1 ? 0 : index + 1;
}

/**
 * Get statistics summary for display
 */
export function getStatsSummary(stats: PlayerStats) {
  return {
    totalPoints: stats.totalPoints,
    gamesPlayed: stats.gamesPlayed,
    wins: stats.wins,
    winRate: Math.round(stats.winRate * 10) / 10, // Round to 1 decimal
    averagePoints: Math.round(stats.averagePoints * 10) / 10,
    podiums: stats.wins + stats.secondPlace + stats.thirdPlace,
  };
}
