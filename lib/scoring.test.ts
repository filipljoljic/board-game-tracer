import { describe, it, expect } from "vitest";
import {
  calculateRawScore,
  calculateTotalFromTemplate,
  assignPlacements,
  calculateLeaguePoints,
  assignLeaguePoints,
  processPlayerScores,
  parseTemplateFields,
  validateTemplateFields,
  type PlayerScore,
  type TemplateField,
} from "./scoring";

describe("calculateRawScore", () => {
  it("should calculate total with multipliers", () => {
    const scoreDetails = { coins: 10, cities: 5 };
    const fields: TemplateField[] = [
      { key: "coins", label: "Coins", multiplier: 1 },
      { key: "cities", label: "Cities", multiplier: 2 },
    ];

    expect(calculateRawScore(scoreDetails, fields)).toBe(20); // 10*1 + 5*2
  });

  it("should handle missing multiplier (default to 1)", () => {
    const scoreDetails = { points: 15 };
    const fields: TemplateField[] = [{ key: "points", label: "Points" }];

    expect(calculateRawScore(scoreDetails, fields)).toBe(15);
  });

  it("should handle missing score values (default to 0)", () => {
    const scoreDetails = { coins: 10 };
    const fields: TemplateField[] = [
      { key: "coins", label: "Coins" },
      { key: "cities", label: "Cities" },
    ];

    expect(calculateRawScore(scoreDetails, fields)).toBe(10);
  });

  it("should return 0 for empty score details", () => {
    const scoreDetails = {};
    const fields: TemplateField[] = [{ key: "coins", label: "Coins" }];

    expect(calculateRawScore(scoreDetails, fields)).toBe(0);
  });
});

describe("calculateTotalFromTemplate", () => {
  it("should parse JSON and calculate total", () => {
    const scoreDetails = { coins: 10, cities: 5 };
    const templateFields = JSON.stringify([
      { key: "coins", label: "Coins", multiplier: 1 },
      { key: "cities", label: "Cities", multiplier: 2 },
    ]);

    expect(calculateTotalFromTemplate(scoreDetails, templateFields)).toBe(20);
  });

  it("should return 0 for invalid JSON", () => {
    const scoreDetails = { coins: 10 };
    const templateFields = "invalid json";

    expect(calculateTotalFromTemplate(scoreDetails, templateFields)).toBe(0);
  });
});

describe("assignPlacements", () => {
  it("should assign placements based on raw scores (descending)", () => {
    const players: PlayerScore[] = [
      { userId: "1", rawScore: 50, placement: 0, pointsAwarded: 0 },
      { userId: "2", rawScore: 100, placement: 0, pointsAwarded: 0 },
      { userId: "3", rawScore: 75, placement: 0, pointsAwarded: 0 },
    ];

    const result = assignPlacements(players);

    expect(result[0]).toMatchObject({
      userId: "2",
      placement: 1,
      rawScore: 100,
    });
    expect(result[1]).toMatchObject({
      userId: "3",
      placement: 2,
      rawScore: 75,
    });
    expect(result[2]).toMatchObject({
      userId: "1",
      placement: 3,
      rawScore: 50,
    });
  });

  it("should handle tied scores (maintain order)", () => {
    const players: PlayerScore[] = [
      { userId: "1", rawScore: 50, placement: 0, pointsAwarded: 0 },
      { userId: "2", rawScore: 50, placement: 0, pointsAwarded: 0 },
    ];

    const result = assignPlacements(players);

    expect(result[0].placement).toBe(1);
    expect(result[1].placement).toBe(2);
  });

  it("should handle single player", () => {
    const players: PlayerScore[] = [
      { userId: "1", rawScore: 100, placement: 0, pointsAwarded: 0 },
    ];

    const result = assignPlacements(players);

    expect(result[0].placement).toBe(1);
  });

  it("should return empty array for empty input", () => {
    const result = assignPlacements([]);
    expect(result).toEqual([]);
  });
});

describe("calculateLeaguePoints", () => {
  it("should calculate points correctly for 4 players", () => {
    expect(calculateLeaguePoints(1, 4)).toBe(4);
    expect(calculateLeaguePoints(2, 4)).toBe(3);
    expect(calculateLeaguePoints(3, 4)).toBe(2);
    expect(calculateLeaguePoints(4, 4)).toBe(1);
  });

  it("should calculate points correctly for 2 players", () => {
    expect(calculateLeaguePoints(1, 2)).toBe(2);
    expect(calculateLeaguePoints(2, 2)).toBe(1);
  });

  it("should throw error for invalid placement", () => {
    expect(() => calculateLeaguePoints(0, 4)).toThrow("Invalid placement");
    expect(() => calculateLeaguePoints(5, 4)).toThrow("Invalid placement");
  });
});

describe("assignLeaguePoints", () => {
  it("should assign points based on placements", () => {
    const players: PlayerScore[] = [
      { userId: "1", rawScore: 100, placement: 1, pointsAwarded: 0 },
      { userId: "2", rawScore: 75, placement: 2, pointsAwarded: 0 },
      { userId: "3", rawScore: 50, placement: 3, pointsAwarded: 0 },
    ];

    const result = assignLeaguePoints(players);

    expect(result[0].pointsAwarded).toBe(3); // 3 players - 1 + 1
    expect(result[1].pointsAwarded).toBe(2);
    expect(result[2].pointsAwarded).toBe(1);
  });
});

describe("processPlayerScores", () => {
  it("should assign placements and points in one call", () => {
    const players: PlayerScore[] = [
      { userId: "1", rawScore: 50, placement: 0, pointsAwarded: 0 },
      { userId: "2", rawScore: 100, placement: 0, pointsAwarded: 0 },
      { userId: "3", rawScore: 75, placement: 0, pointsAwarded: 0 },
    ];

    const result = processPlayerScores(players);

    // Highest score should be 1st place with most points
    expect(result[0]).toMatchObject({
      userId: "2",
      rawScore: 100,
      placement: 1,
      pointsAwarded: 3,
    });

    // Middle score
    expect(result[1]).toMatchObject({
      userId: "3",
      rawScore: 75,
      placement: 2,
      pointsAwarded: 2,
    });

    // Lowest score
    expect(result[2]).toMatchObject({
      userId: "1",
      rawScore: 50,
      placement: 3,
      pointsAwarded: 1,
    });
  });

  it("should handle empty player list", () => {
    const result = processPlayerScores([]);
    expect(result).toEqual([]);
  });
});

describe("parseTemplateFields", () => {
  it("should parse valid JSON fields", () => {
    const json = JSON.stringify([
      { key: "coins", label: "Coins", multiplier: 1 },
      { key: "cities", label: "Cities", multiplier: 2 },
    ]);

    const result = parseTemplateFields(json);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ key: "coins", label: "Coins", multiplier: 1 });
  });

  it("should default multiplier to 1 if not provided", () => {
    const json = JSON.stringify([{ key: "points", label: "Points" }]);

    const result = parseTemplateFields(json);

    expect(result[0].multiplier).toBe(1);
  });

  it("should throw error for invalid JSON", () => {
    expect(() => parseTemplateFields("invalid")).toThrow(
      "Invalid template fields"
    );
  });

  it("should throw error for non-array JSON", () => {
    expect(() => parseTemplateFields("{}")).toThrow("must be an array");
  });

  it("should throw error for fields missing key or label", () => {
    const json = JSON.stringify([
      { key: "coins" }, // missing label
    ]);

    expect(() => parseTemplateFields(json)).toThrow("missing key or label");
  });
});

describe("validateTemplateFields", () => {
  it("should return true for valid fields", () => {
    const fields = [
      { key: "coins", label: "Coins", multiplier: 1 },
      { key: "cities", label: "Cities" },
    ];

    expect(validateTemplateFields(fields)).toBe(true);
  });

  it("should return false for non-array", () => {
    expect(validateTemplateFields({} as any)).toBe(false);
  });

  it("should return false for fields missing key", () => {
    const fields = [{ label: "Coins" }];

    expect(validateTemplateFields(fields)).toBe(false);
  });

  it("should return false for fields with invalid multiplier type", () => {
    const fields = [{ key: "coins", label: "Coins", multiplier: "invalid" }];

    expect(validateTemplateFields(fields)).toBe(false);
  });

  it("should return true for fields without multiplier", () => {
    const fields = [{ key: "points", label: "Points" }];

    expect(validateTemplateFields(fields)).toBe(true);
  });
});
