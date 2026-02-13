export interface ParsedYear {
  year: number;
  yearStart?: number;
  yearEnd?: number;
}

export function parseYear(
  objectDate: string,
  beginDate?: number,
  endDate?: number
): ParsedYear | null {
  if (beginDate && endDate) {
    return {
      year: Math.round((beginDate + endDate) / 2),
      yearStart: beginDate,
      yearEnd: endDate,
    };
  }
  if (beginDate) return { year: beginDate };
  if (endDate) return { year: endDate };

  if (!objectDate) return null;

  const fourDigit = objectDate.match(/\b(\d{4})\b/);
  if (fourDigit) return { year: parseInt(fourDigit[1]) };

  const centuryMatch = objectDate.match(/(\d{1,2})(?:st|nd|rd|th)\s+century/i);
  if (centuryMatch) {
    const century = parseInt(centuryMatch[1]);
    return {
      year: century * 100 - 50,
      yearStart: (century - 1) * 100,
      yearEnd: century * 100,
    };
  }

  return null;
}

export function isValidPainting(data: {
  primaryImage?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  artistNationality?: string;
  culture?: string;
  country?: string;
  classification?: string;
  medium?: string;
}): boolean {
  if (!data.primaryImage) return false;

  const parsed = parseYear(
    data.objectDate || '',
    data.objectBeginDate,
    data.objectEndDate
  );
  if (!parsed || parsed.year < 1300 || parsed.year > 2000) return false;

  // Exclude paintings with date ranges over 50 years — too vague to score fairly
  if (parsed.yearStart != null && parsed.yearEnd != null) {
    if (parsed.yearEnd - parsed.yearStart > 50) return false;
  }

  if (!data.artistNationality && !data.culture && !data.country) return false;

  const medium = (data.medium || '').toLowerCase();
  const classification = (data.classification || '').toLowerCase();
  const excludeTerms = ['sculpture', 'textile', 'ceramic', 'photograph', 'print', 'woodwork'];
  if (excludeTerms.some((t) => medium.includes(t) || classification.includes(t))) {
    return false;
  }

  return true;
}
