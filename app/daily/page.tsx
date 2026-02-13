'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { getTodayDateString, getTimeUntilNextDaily } from '@/lib/daily';
import GameBoard from '@/components/game/GameBoard';
import GalleryLoader from '@/components/ui/GalleryLoader';
import Button from '@/components/ui/Button';

interface DailyResult {
  completed: boolean;
  score: number;
  rounds: [];
}

export default function DailyChallenge() {
  const router = useRouter();
  const { paintings, startGame, resumeGame, setSettings, gameState, resetGame } = useGameStore();
  const [loading, setLoading] = useState(true);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [previousResult, setPreviousResult] = useState<DailyResult | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const todayStr = getTodayDateString();

  useEffect(() => {
    // Check localStorage for today's completion or in-progress game
    const stored = localStorage.getItem(`daily_${todayStr}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.completed) {
        setAlreadyPlayed(true);
        setPreviousResult(parsed);
        setLoading(false);
        return;
      }
      if (parsed.inProgress && parsed.paintings) {
        // Resume the in-progress game
        setSettings({ timerSeconds: null, difficulty: 'normal' });
        resumeGame({
          paintings: parsed.paintings,
          currentRound: parsed.currentRound,
          rounds: parsed.rounds,
          totalScore: parsed.score,
          sessionId: `daily_${todayStr}`,
        });
        setLoading(false);
        return;
      }
    }

    // Load today's paintings
    async function loadDaily() {
      try {
        const res = await fetch('/api/daily');
        const data = await res.json();
        if (data.paintings) {
          setSettings({ timerSeconds: null, difficulty: 'normal' });
          startGame(data.paintings, 'daily', `daily_${todayStr}`);
        }
      } catch (error) {
        console.error('Failed to load daily challenge:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDaily();
  }, [todayStr, setSettings, startGame, resumeGame]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilNextDaily());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save progress to localStorage — both in-progress and final
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'result') {
      const { rounds, totalScore, currentRound, paintings: gamePaintings } = useGameStore.getState();
      localStorage.setItem(
        `daily_${todayStr}`,
        JSON.stringify({
          completed: false,
          inProgress: true,
          score: totalScore,
          currentRound,
          rounds,
          paintings: gamePaintings,
        })
      );
    }
    if (gameState === 'final') {
      const { rounds, totalScore } = useGameStore.getState();
      localStorage.setItem(
        `daily_${todayStr}`,
        JSON.stringify({
          completed: true,
          score: totalScore,
          rounds,
        })
      );
    }
  }, [gameState, todayStr]);

  // Redirect to home if game reset
  useEffect(() => {
    if (!loading && !alreadyPlayed && gameState === 'home') {
      router.replace('/');
    }
  }, [loading, alreadyPlayed, gameState, router]);

  if (loading) {
    return <GalleryLoader message="Preparing today's challenge..." />;
  }

  if (alreadyPlayed) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8] flex flex-col items-center justify-center px-4 relative">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#c9a84c]/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-md relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            className="text-5xl mb-5"
          >
            🏛️
          </motion.div>
          <h1 className="text-3xl font-serif font-bold mb-2">
            Daily Complete!
          </h1>
          <p className="text-[#f5f0e8]/60 mb-2">
            You scored{' '}
            <span className="text-[#c9a84c] font-mono font-bold tabular-nums">
              {previousResult?.score?.toLocaleString()}
            </span>{' '}
            / 50,000 today
          </p>
          <p className="text-[#f5f0e8]/35 text-sm mb-8">
            Next daily challenge in{' '}
            <span className="font-mono text-[#c9a84c]/80 tabular-nums">
              {String(countdown.hours).padStart(2, '0')}:
              {String(countdown.minutes).padStart(2, '0')}:
              {String(countdown.seconds).padStart(2, '0')}
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button onClick={() => router.push('/play')} size="lg">
              Play Standard Game
            </Button>
            <Button onClick={() => router.push('/')} variant="secondary" size="lg">
              Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'home') {
    return null;
  }

  return <GameBoard mode="daily" dailyDate={todayStr} />;
}
