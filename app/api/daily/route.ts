import { NextResponse } from 'next/server';
import { getDailySeed, getTodayDateString } from '@/lib/daily';
import { fetchRandomPaintings } from '@/lib/paintings/metApi';
import { getDailyFallbackPaintings } from '@/lib/paintings/fallbackData';

export async function GET() {
  const today = new Date();
  const dateStr = getTodayDateString();
  const seed = getDailySeed(today);

  try {
    const paintings = await fetchRandomPaintings(5, seed);
    if (paintings.length >= 5) {
      return NextResponse.json({ date: dateStr, seed, paintings });
    }
    // Fill gaps with seeded fallback
    const remaining = 5 - paintings.length;
    const fallback = getDailyFallbackPaintings(seed, remaining);
    return NextResponse.json({ date: dateStr, seed, paintings: [...paintings, ...fallback] });
  } catch (error) {
    console.error('Daily challenge Met API error:', error);
    const paintings = getDailyFallbackPaintings(seed, 5);
    return NextResponse.json({ date: dateStr, seed, paintings });
  }
}
