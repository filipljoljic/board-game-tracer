/**
 * Template field definition
 */
export type TemplateField = {
  key: string;
  label: string;
  multiplier?: number;
};

/**
 * Player score data
 */
export type PlayerScore = {
  userId: string;
  rawScore: number;
  placement: number;
  pointsAwarded: number;
  scoreDetails?: Record<string, number>;
};

/**
 * Calculate raw score from score details using template fields
 */
export function calculateRawScore(
  scoreDetails: Record<string, number>,
  fields: TemplateField[]
): number {
  let total = 0;

  for (const field of fields) {
    const value = scoreDetails[field.key] || 0;
    const multiplier = field.multiplier || 1;
    total += value * multiplier;
  }

  return total;
}

/**
 * Calculate raw score from template-based score details
 */
export function calculateTotalFromTemplate(
  scoreDetails: Record<string, number>,
  templateFields: string
): number {
  try {
    const fields = JSON.parse(templateFields) as TemplateField[];
    return calculateRawScore(scoreDetails, fields);
  } catch {
    return 0;
  }
}

/**
 * Assign placements to players based on raw scores (higher score = better placement)
 */
export function assignPlacements(players: PlayerScore[]): PlayerScore[] {
  // Sort by raw score descending (highest score first)
  const sorted = [...players].sort((a, b) => b.rawScore - a.rawScore);

  // Assign placements
  sorted.forEach((player, index) => {
    player.placement = index + 1;
  });

  return sorted;
}

/**
 * Calculate league points based on placement
 * Formula: totalPlayers - placement + 1
 * Example with 4 players: 1st=4pts, 2nd=3pts, 3rd=2pts, 4th=1pt
 */
export function calculateLeaguePoints(
  placement: number,
  totalPlayers: number
): number {
  if (placement < 1 || placement > totalPlayers) {
    throw new Error(
      `Invalid placement ${placement} for ${totalPlayers} players`
    );
  }

  return totalPlayers - placement + 1;
}

/**
 * Calculate league points for all players
 */
export function assignLeaguePoints(players: PlayerScore[]): PlayerScore[] {
  const totalPlayers = players.length;

  return players.map((player) => ({
    ...player,
    pointsAwarded: calculateLeaguePoints(player.placement, totalPlayers),
  }));
}

/**
 * Process player scores: assign placements and league points
 */
export function processPlayerScores(players: PlayerScore[]): PlayerScore[] {
  if (players.length === 0) {
    return [];
  }

  // Assign placements based on raw scores
  const withPlacements = assignPlacements(players);

  // Assign league points based on placements
  const withPoints = assignLeaguePoints(withPlacements);

  return withPoints;
}

/**
 * Parse and validate template fields from JSON string
 */
export function parseTemplateFields(fieldsJson: string): TemplateField[] {
  try {
    const fields = JSON.parse(fieldsJson);

    if (!Array.isArray(fields)) {
      throw new Error("Template fields must be an array");
    }

    return fields.map((field, index) => {
      if (!field.key || !field.label) {
        throw new Error(`Field at index ${index} missing key or label`);
      }

      return {
        key: field.key,
        label: field.label,
        multiplier: field.multiplier || 1,
      };
    });
  } catch (error) {
    throw new Error(`Invalid template fields: ${error}`);
  }
}

/**
 * Validate template fields structure
 */
export function validateTemplateFields(fields: any[]): boolean {
  if (!Array.isArray(fields)) {
    return false;
  }

  return fields.every(
    (field) =>
      field.key &&
      typeof field.key === "string" &&
      field.label &&
      typeof field.label === "string" &&
      (field.multiplier === undefined || typeof field.multiplier === "number")
  );
}
