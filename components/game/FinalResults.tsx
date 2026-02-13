'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RoundResult } from '@/types';
import { getRating, getScoreEmoji } from '@/lib/scoring';
import { formatDistance } from '@/lib/utils';
import ScoreCounter from '@/components/ui/ScoreCounter';
import ShareCard from '@/components/ui/ShareCard';
import Button from '@/components/ui/Button';

interface FinalResultsProps {
  rounds: RoundResult[];
  totalScore: number;
  mode: 'standard' | 'daily';
  date?: string;
  onPlayAgain: () => void;
}

const scoreColor = (score: number) =>
  score >= 4000 ? 'text-green-400' : score >= 2000 ? 'text-[#c9a84c]' : 'text-red-400';

export default function FinalResults({
  rounds,
  totalScore,
  mode,
  date,
  onPlayAgain,
}: FinalResultsProps) {
  const rating = getRating(totalScore);
  const confettiFired = useRef(false);

  // Confetti for great total scores
  useEffect(() => {
    if (totalScore >= 40000 && !confettiFired.current) {
      confettiFired.current = true;
      import('canvas-confetti').then((mod) => {
        const fire = mod.default;
        const duration = 2000;
        const end = Date.now() + duration;
        const frame = () => {
          fire({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#c9a84c', '#f5f0e8', '#4ade80'],
          });
          fire({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#c9a84c', '#f5f0e8', '#4ade80'],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      });
    }
  }, [totalScore]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title + rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8"
        >
          <p className="text-sm text-[#c9a84c]/80 mb-3 tracking-wide">
            {mode === 'daily' ? `Daily Challenge — ${date}` : 'Game Complete'}
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {rating.emoji}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl lg:text-4xl font-serif font-bold mb-3"
          >
            {rating.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-4xl font-mono font-bold text-[#c9a84c]"
          >
            <ScoreCounter target={totalScore} duration={2000} />
            <span className="text-lg text-[#f5f0e8]/30 self-end mb-1">
              / 50,000
            </span>
          </motion.div>
        </motion.div>

        {/* Round summary table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#2a2a4e] overflow-hidden mb-8"
        >
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 text-[10px] text-[#f5f0e8]/40 uppercase tracking-[0.15em] px-4 py-3 border-b border-[#2a2a4e]">
            <span>#</span>
            <span>Painting</span>
            <span className="text-right">Location</span>
            <span className="text-right">Year</span>
            <span className="text-right">Total</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {rounds.map((round, i) => (
              <motion.div
                key={i}
                variants={rowVariants}
                className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 items-center px-4 py-3 border-b border-[#2a2a4e]/40 last:border-0 hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-[#f5f0e8]/30 text-sm w-6 font-mono">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {round.painting.title}
                  </p>
                  <p className="text-xs text-[#f5f0e8]/35 truncate">
                    {round.painting.artist} &middot; {round.painting.yearDisplay}
                  </p>
                  <div className="flex gap-1 text-[10px] text-[#f5f0e8]/25 mt-0.5">
                    <span>{formatDistance(round.distanceKm)} off</span>
                    <span>&middot;</span>
                    <span>{round.yearDifference} yr off</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-mono font-medium ${scoreColor(round.locationScore)}`}>
                    {round.locationScore.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-mono font-medium ${scoreColor(round.yearScore)}`}>
                    {round.yearScore.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-[#c9a84c]">
                    {round.totalScore.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#2a2a4e] p-4 mb-8"
        >
          <p className="text-[10px] text-[#f5f0e8]/40 uppercase tracking-[0.15em] mb-3">
            Share your results
          </p>
          <ShareCard
            rounds={rounds}
            totalScore={totalScore}
            mode={mode}
            date={date}
          />
        </motion.div>

        {/* Play again */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <Button onClick={onPlayAgain} size="lg">
            Play Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
