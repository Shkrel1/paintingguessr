import { Painting } from '@/types';
import fallbackPaintingsData from '@/data/fallback-paintings.json';

interface FallbackPaintingRaw {
  id: string;
  title: string;
  artist: string;
  year: number;
  location: { lat: number; lng: number; name: string };
  imageUrl: string;
  description: string;
  nationality: string;
  medium: string;
}

const fallbackPaintings: Painting[] = (fallbackPaintingsData as FallbackPaintingRaw[]).map((p) => ({
  ...p,
  yearDisplay: String(p.year),
  source: 'fallback' as const,
}));

export function getFallbackPaintings(count: number, seed?: number): Painting[] {
  const shuffled = [...fallbackPaintings];
  let s = seed ?? Math.floor(Math.random() * 1000000);

  const random = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export function getDailyFallbackPaintings(seed: number, count: number = 5): Painting[] {
  return getFallbackPaintings(count, seed);
}

export function getAllFallbackPaintings(): Painting[] {
  return [...fallbackPaintings];
}

export default fallbackPaintings;
