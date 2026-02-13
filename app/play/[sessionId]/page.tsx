'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import GameBoard from '@/components/game/GameBoard';
import GalleryLoader from '@/components/ui/GalleryLoader';

export default function GameSession() {
  const router = useRouter();
  const { paintings, gameState } = useGameStore();

  useEffect(() => {
    if (paintings.length === 0) {
      router.replace('/play');
    }
  }, [paintings, router]);

  useEffect(() => {
    if (gameState === 'home') {
      router.replace('/');
    }
  }, [gameState, router]);

  if (paintings.length === 0) {
    return <GalleryLoader message="Loading gallery..." />;
  }

  return <GameBoard mode="standard" />;
}
