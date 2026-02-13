import { NextResponse } from 'next/server';
import { fetchRandomPaintings } from '@/lib/paintings/metApi';
import { getFallbackPaintings } from '@/lib/paintings/fallbackData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get('count') || '5');
  const source = searchParams.get('source') || 'met';

  try {
    if (source === 'fallback') {
      const paintings = getFallbackPaintings(count);
      return NextResponse.json({ paintings });
    }

    // Default: fetch from Met API, fill gaps with fallback
    const paintings = await fetchRandomPaintings(count);
    if (paintings.length >= count) {
      return NextResponse.json({ paintings });
    }
    const remaining = count - paintings.length;
    const fallback = getFallbackPaintings(remaining);
    return NextResponse.json({ paintings: [...paintings, ...fallback] });
  } catch (error) {
    console.error('Error fetching paintings:', error);
    const paintings = getFallbackPaintings(count);
    return NextResponse.json({ paintings });
  }
}
