export function calculateLocationScore(distanceKm: number): number {
  const MAX_DISTANCE = 20000; // ~half Earth circumference

  // Cubic curve: generous for close guesses, drops hard for far ones
  // 0km = 5000, 20000km = 0
  const base = 5000 * Math.pow(Math.max(0, 1 - distanceKm / MAX_DISTANCE), 3);

  // Small country bonus: up to 500 extra points within ~1500km
  const COUNTRY_RADIUS = 1500;
  const countryBonus =
    distanceKm < COUNTRY_RADIUS
      ? 500 * Math.pow(1 - distanceKm / COUNTRY_RADIUS, 2)
      : 0;

  return Math.round(Math.min(5000, base + countryBonus));
}

export function calculateYearScore(
  guessedYear: number,
  actualYear: number,
  yearStart?: number,
  yearEnd?: number
): number {
  // Within range = 5000. Outside range = drops off fast. No range = exact year needed.
  if (yearStart != null && yearEnd != null && guessedYear >= yearStart && guessedYear <= yearEnd) {
    return 5000;
  }

  // Distance from nearest edge (or exact year if no range)
  let yearsOff: number;
  if (yearStart != null && yearEnd != null) {
    yearsOff = Math.min(Math.abs(guessedYear - yearStart), Math.abs(guessedYear - yearEnd));
  } else {
    yearsOff = Math.abs(guessedYear - actualYear);
  }

  // 0 years off = 5000, 250+ years off = 0
  // Two-tier: gentle within 100 years, drops hard after
  const MAX_YEARS_OFF = 250;
  if (yearsOff >= MAX_YEARS_OFF) return 0;
  let score: number;
  if (yearsOff <= 100) {
    score = 5000 * Math.pow(1 - yearsOff / MAX_YEARS_OFF, 2);
  } else {
    const scoreAt100 = 5000 * Math.pow(1 - 100 / MAX_YEARS_OFF, 2);
    score = scoreAt100 * Math.pow(1 - (yearsOff - 100) / (MAX_YEARS_OFF - 100), 4);
  }
  return Math.round(score);
}

export function calculateYearDifference(
  guessedYear: number,
  actualYear: number,
  yearStart?: number,
  yearEnd?: number
): number {
  // Show distance from nearest edge (0 if within range)
  if (yearStart != null && yearEnd != null) {
    if (guessedYear >= yearStart && guessedYear <= yearEnd) return 0;
    return Math.min(
      Math.abs(guessedYear - yearStart),
      Math.abs(guessedYear - yearEnd)
    );
  }
  return Math.abs(guessedYear - actualYear);
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getScoreEmoji(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.9) return '🟢🟢🟢🟢🟢';
  if (ratio >= 0.7) return '🟢🟢🟢🟢⚪';
  if (ratio >= 0.5) return '🟢🟢🟢⚪⚪';
  if (ratio >= 0.3) return '🟢🟢⚪⚪⚪';
  if (ratio >= 0.1) return '🟢⚪⚪⚪⚪';
  return '⚪⚪⚪⚪⚪';
}

export function getRating(totalScore: number): { title: string; emoji: string } {
  if (totalScore >= 45000) return { title: 'Art Historian', emoji: '🏛️' };
  if (totalScore >= 35000) return { title: 'Gallery Curator', emoji: '🎨' };
  if (totalScore >= 25000) return { title: 'Art Student', emoji: '📚' };
  if (totalScore >= 15000) return { title: 'Museum Tourist', emoji: '🗺️' };
  return { title: 'Finger Painter', emoji: '🖌️' };
}
