import { describe, it, expect } from "vitest";
import {
  aggregatePlayerStats,
  sortLeaderboard,
  calculateWinRate,
  getTopPlayers,
  calculatePlayerRank,
  getStatsSummary,
  type SessionData,
  type PlayerStats,
} from "./leaderboard";

describe("aggregatePlayerStats", () => {
  it("should aggregate stats for single player", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 2,
        placement: 2,
        totalPlayers: 3,
      },
    ];

    const result = aggregatePlayerStats(sessions);
    const aliceStats = result.get("1");

    expect(aliceStats).toBeDefined();
    expect(aliceStats?.totalPoints).toBe(5);
    expect(aliceStats?.gamesPlayed).toBe(2);
    expect(aliceStats?.wins).toBe(1);
    expect(aliceStats?.secondPlace).toBe(1);
    expect(aliceStats?.averagePoints).toBe(2.5);
    expect(aliceStats?.winRate).toBe(50);
  });

  it("should aggregate stats for multiple players", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 2,
      },
      {
        userId: "2",
        userName: "Bob",
        pointsAwarded: 1,
        placement: 2,
        totalPlayers: 2,
      },
    ];

    const result = aggregatePlayerStats(sessions);

    expect(result.size).toBe(2);
    expect(result.get("1")?.totalPoints).toBe(3);
    expect(result.get("2")?.totalPoints).toBe(1);
  });

  it("should track last place correctly", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 1,
        placement: 4,
        totalPlayers: 4,
      },
    ];

    const result = aggregatePlayerStats(sessions);
    const stats = result.get("1");

    expect(stats?.lastPlace).toBe(1);
  });

  it("should handle empty sessions", () => {
    const result = aggregatePlayerStats([]);
    expect(result.size).toBe(0);
  });

  it("should calculate win rate correctly", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 2,
        placement: 2,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 1,
        placement: 3,
        totalPlayers: 3,
      },
    ];

    const result = aggregatePlayerStats(sessions);
    const stats = result.get("1");

    expect(stats?.wins).toBe(2);
    expect(stats?.gamesPlayed).toBe(4);
    expect(stats?.winRate).toBe(50);
  });
});

describe("sortLeaderboard", () => {
  it("should sort by total points descending", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 50,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 3,
        thirdPlace: 2,
        lastPlace: 0,
        averagePoints: 5,
        winRate: 50,
      },
      {
        userId: "2",
        userName: "Bob",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 8,
        secondPlace: 2,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 80,
      },
      {
        userId: "3",
        userName: "Charlie",
        totalPoints: 75,
        gamesPlayed: 10,
        wins: 6,
        secondPlace: 4,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 7.5,
        winRate: 60,
      },
    ];

    const result = sortLeaderboard(players);

    expect(result[0].userId).toBe("2"); // Bob - 100 points
    expect(result[1].userId).toBe("3"); // Charlie - 75 points
    expect(result[2].userId).toBe("1"); // Alice - 50 points
  });

  it("should break ties by games played (fewer is better)", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 100,
        gamesPlayed: 20,
        wins: 10,
        secondPlace: 5,
        thirdPlace: 5,
        lastPlace: 0,
        averagePoints: 5,
        winRate: 50,
      },
      {
        userId: "2",
        userName: "Bob",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 10,
        secondPlace: 0,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 100,
      },
    ];

    const result = sortLeaderboard(players);

    // Bob should be first (fewer games to reach 100 points)
    expect(result[0].userId).toBe("2");
  });

  it("should break secondary ties by wins", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 5,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 50,
      },
      {
        userId: "2",
        userName: "Bob",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 8,
        secondPlace: 2,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 80,
      },
    ];

    const result = sortLeaderboard(players);

    // Bob should be first (more wins)
    expect(result[0].userId).toBe("2");
  });

  it("should handle empty array", () => {
    const result = sortLeaderboard([]);
    expect(result).toEqual([]);
  });
});

describe("calculateWinRate", () => {
  it("should calculate win rate correctly", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 2,
        placement: 2,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 1,
        placement: 3,
        totalPlayers: 3,
      },
    ];

    const winRate = calculateWinRate("1", sessions);
    expect(winRate).toBe(50); // 2 wins out of 4 games
  });

  it("should return 0 for no sessions", () => {
    const winRate = calculateWinRate("1", []);
    expect(winRate).toBe(0);
  });

  it("should return 0 for user with no wins", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 2,
        placement: 2,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 1,
        placement: 3,
        totalPlayers: 3,
      },
    ];

    const winRate = calculateWinRate("1", sessions);
    expect(winRate).toBe(0);
  });

  it("should return 100 for user with all wins", () => {
    const sessions: SessionData[] = [
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
      {
        userId: "1",
        userName: "Alice",
        pointsAwarded: 3,
        placement: 1,
        totalPlayers: 3,
      },
    ];

    const winRate = calculateWinRate("1", sessions);
    expect(winRate).toBe(100);
  });
});

describe("getTopPlayers", () => {
  it("should return top N players", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 50,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 3,
        thirdPlace: 2,
        lastPlace: 0,
        averagePoints: 5,
        winRate: 50,
      },
      {
        userId: "2",
        userName: "Bob",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 8,
        secondPlace: 2,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 80,
      },
      {
        userId: "3",
        userName: "Charlie",
        totalPoints: 75,
        gamesPlayed: 10,
        wins: 6,
        secondPlace: 4,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 7.5,
        winRate: 60,
      },
    ];

    const result = getTopPlayers(players, 2);

    expect(result).toHaveLength(2);
    expect(result[0].userId).toBe("2");
    expect(result[1].userId).toBe("3");
  });

  it("should default to top 10", () => {
    const players: PlayerStats[] = [];
    for (let i = 0; i < 15; i++) {
      players.push({
        userId: `${i}`,
        userName: `Player${i}`,
        totalPoints: 100 - i,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 3,
        thirdPlace: 2,
        lastPlace: 0,
        averagePoints: 10 - i * 0.1,
        winRate: 50,
      });
    }

    const result = getTopPlayers(players);
    expect(result).toHaveLength(10);
  });
});

describe("calculatePlayerRank", () => {
  it("should return correct rank", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 50,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 3,
        thirdPlace: 2,
        lastPlace: 0,
        averagePoints: 5,
        winRate: 50,
      },
      {
        userId: "2",
        userName: "Bob",
        totalPoints: 100,
        gamesPlayed: 10,
        wins: 8,
        secondPlace: 2,
        thirdPlace: 0,
        lastPlace: 0,
        averagePoints: 10,
        winRate: 80,
      },
    ];

    expect(calculatePlayerRank("2", players)).toBe(1);
    expect(calculatePlayerRank("1", players)).toBe(2);
  });

  it("should return 0 for non-existent player", () => {
    const players: PlayerStats[] = [
      {
        userId: "1",
        userName: "Alice",
        totalPoints: 50,
        gamesPlayed: 10,
        wins: 5,
        secondPlace: 3,
        thirdPlace: 2,
        lastPlace: 0,
        averagePoints: 5,
        winRate: 50,
      },
    ];

    expect(calculatePlayerRank("999", players)).toBe(0);
  });
});

describe("getStatsSummary", () => {
  it("should format stats for display", () => {
    const stats: PlayerStats = {
      userId: "1",
      userName: "Alice",
      totalPoints: 100,
      gamesPlayed: 20,
      wins: 8,
      secondPlace: 5,
      thirdPlace: 3,
      lastPlace: 4,
      averagePoints: 5.123456,
      winRate: 40.5555,
    };

    const summary = getStatsSummary(stats);

    expect(summary.totalPoints).toBe(100);
    expect(summary.gamesPlayed).toBe(20);
    expect(summary.wins).toBe(8);
    expect(summary.winRate).toBe(40.6); // Rounded to 1 decimal
    expect(summary.averagePoints).toBe(5.1); // Rounded to 1 decimal
    expect(summary.podiums).toBe(16); // wins + 2nd + 3rd
  });
});
