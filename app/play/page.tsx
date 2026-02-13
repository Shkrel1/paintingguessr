'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { generateSessionId } from '@/lib/utils';
import { GameSettings } from '@/types';
import Button from '@/components/ui/Button';
import GalleryLoader from '@/components/ui/GalleryLoader';

export default function PlaySettings() {
  const router = useRouter();
  const { setSettings, startGame } = useGameStore();
  const [settings, setLocalSettings] = useState<GameSettings>({
    timerSeconds: null,
    difficulty: 'normal',
  });
  const [loading, setLoading] = useState(false);

  const timerOptions: { value: number | null; label: string }[] = [
    { value: null, label: 'No Timer' },
    { value: 30, label: '30s' },
    { value: 60, label: '60s' },
    { value: 90, label: '90s' },
  ];

  const difficultyOptions: { value: GameSettings['difficulty']; label: string; desc: string; icon: string }[] = [
    { value: 'easy', label: 'Easy', desc: 'Year only — no location guessing', icon: '🌿' },
    { value: 'normal', label: 'Normal', desc: 'No hints — pure knowledge and instinct', icon: '🎯' },
    { value: 'hard', label: 'Hard', desc: 'Painting is blurred — only the title is revealed', icon: '🔥' },
  ];

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/paintings?count=5');
      const data = await res.json();

      if (data.paintings && data.paintings.length >= 5) {
        const sessionId = generateSessionId();
        setSettings(settings);
        startGame(data.paintings, 'standard', sessionId);
        router.push(`/play/${sessionId}`);
      }
    } catch (error) {
      console.error('Failed to load paintings:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <GalleryLoader message="Curating paintings from the gallery..." />;
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8] flex flex-col items-center justify-center px-4 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#c9a84c]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back */}
        <Link
          href="/"
          className="text-[#f5f0e8]/40 hover:text-[#f5f0e8]/70 text-sm mb-10 transition-colors flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>

        <h1 className="text-3xl font-serif font-bold mb-10">Game Settings</h1>

        {/* Timer */}
        <div className="mb-10">
          <h2 className="text-xs font-medium text-[#f5f0e8]/40 mb-3 uppercase tracking-[0.15em]">
            Timer
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {timerOptions.map((opt) => (
              <motion.button
                key={opt.label}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setLocalSettings((s) => ({ ...s, timerSeconds: opt.value }))
                }
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  settings.timerSeconds === opt.value
                    ? 'bg-[#c9a84c]/15 border-[#c9a84c]/60 text-[#c9a84c] shadow-sm shadow-[#c9a84c]/5'
                    : 'bg-[#16213e]/60 border-[#2a2a4e] text-[#f5f0e8]/60 hover:border-[#c9a84c]/30 hover:text-[#f5f0e8]/80'
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-12">
          <h2 className="text-xs font-medium text-[#f5f0e8]/40 mb-3 uppercase tracking-[0.15em]">
            Difficulty
          </h2>
          <div className="space-y-2">
            {difficultyOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() =>
                  setLocalSettings((s) => ({ ...s, difficulty: opt.value }))
                }
                className={`w-full px-4 py-3.5 rounded-lg text-left transition-all duration-200 border flex items-start gap-3 ${
                  settings.difficulty === opt.value
                    ? 'bg-[#c9a84c]/10 border-[#c9a84c]/50 shadow-sm shadow-[#c9a84c]/5'
                    : 'bg-[#16213e]/40 border-[#2a2a4e] hover:border-[#c9a84c]/30'
                }`}
              >
                <span className="text-lg mt-0.5">{opt.icon}</span>
                <div>
                  <span
                    className={`text-sm font-semibold ${settings.difficulty === opt.value ? 'text-[#c9a84c]' : 'text-[#f5f0e8]/90'}`}
                  >
                    {opt.label}
                  </span>
                  <AnimatePresence>
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-[#f5f0e8]/35 mt-0.5 leading-relaxed"
                    >
                      {opt.desc}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Start */}
        <Button
          onClick={handleStart}
          size="lg"
          className="w-full text-base animate-pulse-gold"
        >
          Start Game
        </Button>
      </motion.div>
    </div>
  );
}
