import { Painting } from '@/types';
import { parseYear, isValidPainting } from './validation';

const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

let cachedObjectIds: number[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Maps country/culture names to their nationality-map keys
const CULTURE_TO_NATIONALITY: Record<string, string> = {
  'China': 'Chinese',
  'Japan': 'Japanese',
  'Korea': 'Korean',
  'India': 'Indian',
  'Thailand': 'Thai',
  'Vietnam': 'Vietnamese',
  'Indonesia': 'Indonesian',
  'Malaysia': 'Malaysian',
  'Nepal': 'Nepali',
  'Iran': 'Iranian',
  'Persia': 'Persian',
  'Turkey': 'Turkish',
  'Egypt': 'Egyptian',
  'Mexico': 'Mexican',
  'Brazil': 'Brazilian',
  'Argentina': 'Argentine',
  'Russia': 'Russian',
  'France': 'French',
  'Germany': 'German',
  'Italy': 'Italian',
  'Spain': 'Spanish',
  'Portugal': 'Portuguese',
  'Netherlands': 'Dutch',
  'Belgium': 'Belgian',
  'Britain': 'British',
  'England': 'British',
  'Scotland': 'British',
  'Ireland': 'Irish',
  'Austria': 'Austrian',
  'Switzerland': 'Swiss',
  'Sweden': 'Swedish',
  'Norway': 'Norwegian',
  'Denmark': 'Danish',
  'Finland': 'Finnish',
  'Poland': 'Polish',
  'Czech Republic': 'Czech',
  'Bohemia': 'Czech',
  'Hungary': 'Hungarian',
  'Greece': 'Greek',
  'Romania': 'Romanian',
  'Serbia': 'Serbian',
  'Croatia': 'Croatian',
  'Bulgaria': 'Bulgarian',
  'Ukraine': 'Ukrainian',
  'Georgia': 'Georgian',
  'Armenia': 'Armenian',
  'Tibet': 'Tibetan',
  'Mongolia': 'Mongolian',
  'Burma': 'Burmese',
  'Myanmar': 'Burmese',
  'Cambodia': 'Cambodian',
  'Philippines': 'Filipino',
  'Pakistan': 'Pakistani',
  'Sri Lanka': 'Sri Lankan',
  'Iraq': 'Iraqi',
  'Syria': 'Syrian',
  'Morocco': 'Moroccan',
  'Algeria': 'Algerian',
  'Tunisia': 'Tunisian',
  'Nigeria': 'Nigerian',
  'Ethiopia': 'Ethiopian',
  'South Africa': 'South African',
  'Cuba': 'Cuban',
  'Colombia': 'Colombian',
  'Peru': 'Peruvian',
  'Chile': 'Chilean',
  'Canada': 'Canadian',
  'Australia': 'Australian',
};

export async function getArtistLocation(
  artistName: string,
  nationality: string,
  culture: string,
  country: string
): Promise<{ lat: number; lng: number; name: string }> {
  // Dynamic imports to avoid bundling issues
  let artistLocations: Record<string, { lat: number; lng: number; location: string }>;
  let nationalityMap: Record<string, { lat: number; lng: number; city: string }>;

  try {
    artistLocations = (await import('@/data/artist-locations.json')).default;
  } catch {
    artistLocations = {};
  }

  try {
    nationalityMap = (await import('@/data/nationality-map.json')).default;
  } catch {
    nationalityMap = {};
  }

  // Try exact artist match
  if (artistName && artistLocations[artistName]) {
    const loc = artistLocations[artistName];
    return { lat: loc.lat, lng: loc.lng, name: loc.location };
  }

  // Try all available fields: nationality, culture, country
  const candidates = [nationality, culture, country].filter(Boolean);

  for (const nat of candidates) {
    // Direct nationality map match
    if (nationalityMap[nat]) {
      const loc = nationalityMap[nat];
      return { lat: loc.lat, lng: loc.lng, name: loc.city };
    }

    // Culture/country name → nationality mapping
    const mapped = CULTURE_TO_NATIONALITY[nat];
    if (mapped && nationalityMap[mapped]) {
      const loc = nationalityMap[mapped];
      return { lat: loc.lat, lng: loc.lng, name: loc.city };
    }
  }

  // Fuzzy partial matching as last resort (e.g. "possibly Chinese" → "Chinese")
  const allText = candidates.join(' ').toLowerCase();
  for (const [key, value] of Object.entries(nationalityMap)) {
    if (allText.includes(key.toLowerCase())) {
      return { lat: value.lat, lng: value.lng, name: value.city };
    }
  }

  // Default fallback — unknown location rather than pretending it's Europe
  return { lat: 30, lng: 10, name: 'Unknown' };
}

export async function fetchPaintingIds(): Promise<number[]> {
  const now = Date.now();
  if (cachedObjectIds && now - cacheTimestamp < CACHE_DURATION) {
    return cachedObjectIds;
  }

  try {
    const res = await fetch(
      `${MET_API_BASE}/search?hasImages=true&medium=Paintings&isPublicDomain=true&q=*`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    if (data.objectIDs && data.objectIDs.length > 0) {
      cachedObjectIds = data.objectIDs;
      cacheTimestamp = now;
      return data.objectIDs;
    }
  } catch (e) {
    console.error('Failed to fetch Met API painting IDs:', e);
  }

  return [];
}

export async function fetchPaintingById(objectId: number): Promise<Painting | null> {
  try {
    const res = await fetch(`${MET_API_BASE}/objects/${objectId}`, {
      next: { revalidate: 86400 },
    });
    const data = await res.json();

    if (!isValidPainting(data)) return null;

    const parsed = parseYear(data.objectDate, data.objectBeginDate, data.objectEndDate);
    if (!parsed) return null;

    const location = await getArtistLocation(
      data.artistDisplayName || '',
      data.artistNationality || '',
      data.culture || '',
      data.country || ''
    );

    return {
      id: `met_${objectId}`,
      title: data.title || 'Untitled',
      artist: data.artistDisplayName || 'Unknown Artist',
      year: parsed.year,
      yearStart: parsed.yearStart,
      yearEnd: parsed.yearEnd,
      yearDisplay: data.objectDate || (parsed.yearStart && parsed.yearEnd && parsed.yearStart !== parsed.yearEnd ? `${parsed.yearStart}–${parsed.yearEnd}` : String(parsed.year)),
      location,
      imageUrl: data.primaryImage || data.primaryImageSmall,
      description: `${data.title || 'This work'} by ${data.artistDisplayName || 'an unknown artist'}. ${data.medium || ''} ${data.dimensions ? `(${data.dimensions})` : ''}`.trim(),
      nationality: data.artistNationality || data.culture || 'Unknown',
      medium: data.medium,
      source: 'met_api',
    };
  } catch (e) {
    console.error(`Failed to fetch painting ${objectId}:`, e);
    return null;
  }
}

function makeSeededRandom(seed?: number): () => number {
  let s = seed ?? Math.floor(Math.random() * 2147483647);
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export async function fetchRandomPaintings(count: number, seed?: number): Promise<Painting[]> {
  const ids = await fetchPaintingIds();
  if (ids.length === 0) return [];

  const random = makeSeededRandom(seed);
  const paintings: Painting[] = [];
  const tried = new Set<number>();

  // Pick random IDs in batches and fetch in parallel for speed
  const maxRounds = 5;
  for (let round = 0; round < maxRounds && paintings.length < count; round++) {
    const batchSize = (count - paintings.length) * 3; // overshoot to account for invalid ones
    const batch: number[] = [];

    for (let i = 0; i < batchSize && batch.length < batchSize; i++) {
      const randomIndex = Math.floor(random() * ids.length);
      const objectId = ids[randomIndex];
      if (!tried.has(objectId)) {
        tried.add(objectId);
        batch.push(objectId);
      }
    }

    const results = await Promise.all(batch.map((id) => fetchPaintingById(id)));
    for (const p of results) {
      if (p && paintings.length < count) {
        paintings.push(p);
      }
    }
  }

  return paintings;
}
