'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { RoundResult as RoundResultType } from '@/types';
import { formatDistance } from '@/lib/utils';
import ScoreCounter from '@/components/ui/ScoreCounter';
import Button from '@/components/ui/Button';

const GuessMap = dynamic(() => import('./GuessMap'), { ssr: false });

interface RoundResultProps {
  result: RoundResultType;
  roundNumber: number;
  totalRounds: number;
  runningTotal: number;
  onNext: () => void;
  isLast: boolean;
}

const scoreColor = (score: number) =>
  score >= 4000 ? 'text-green-400' : score >= 2000 ? 'text-[#c9a84c]' : 'text-red-400';

export default function RoundResultScreen({
  result,
  roundNumber,
  totalRounds,
  runningTotal,
  onNext,
  isLast,
}: RoundResultProps) {
  const [showScores, setShowScores] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScores(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Canvas confetti for great scores
  useEffect(() => {
    if (result.totalScore >= 9000 && !confettiFired.current) {
      confettiFired.current = true;
      import('canvas-confetti').then((mod) => {
        const fire = mod.default;
        // Gold confetti burst
        fire({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c9a84c', '#f5f0e8', '#b8942f', '#4ade80'],
          ticks: 200,
        });
        setTimeout(() => {
          fire({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.5, x: 0.3 },
            colors: ['#c9a84c', '#f5f0e8'],
            ticks: 150,
          });
        }, 200);
        setTimeout(() => {
          fire({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.5, x: 0.7 },
            colors: ['#c9a84c', '#f5f0e8'],
            ticks: 150,
          });
        }, 400);
      });
    }
  }, [result.totalScore]);

  const yearDiffLabel =
    result.yearDifference === 0
      ? 'Exact!'
      : `${result.yearDifference} yr off`;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8] p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-[#c9a84c] text-sm font-medium mb-1 tracking-wide">
            Round {roundNumber} of {totalRounds}
          </p>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold">
            Round Complete
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Painting info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#2a2a4e] p-6"
          >
            <h3 className="text-xl font-serif font-bold text-[#c9a84c] mb-1">
              {result.painting.title}
            </h3>
            <p className="text-[#f5f0e8]/80 mb-1">
              by <span className="font-medium">{result.painting.artist}</span>
            </p>
            <p className="text-[#f5f0e8]/60 text-sm mb-1">
              {result.painting.yearDisplay} &middot;{' '}
              {result.painting.location.name}
            </p>
            {result.painting.yearStart != null && result.painting.yearEnd != null && result.painting.yearStart !== result.painting.yearEnd && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[#c9a84c]/60 text-xs mt-1.5 font-medium"
              >
                Date range: {result.painting.yearStart}–{result.painting.yearEnd}
                {result.guess.year !== null && result.guess.year >= result.painting.yearStart && result.guess.year <= result.painting.yearEnd && (
                  <span className="text-green-400/80 ml-2">Your guess is within range!</span>
                )}
              </motion.p>
            )}
            {result.painting.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#f5f0e8]/40 text-sm mt-3 leading-relaxed"
              >
                {result.painting.description}
              </motion.p>
            )}
          </motion.div>

          {/* Map result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <GuessMap
              onLocationSelect={() => {}}
              selectedLocation={result.guess.location}
              correctLocation={result.painting.location}
              showResult
              disabled
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-[#f5f0e8]/50 mt-2"
            >
              Distance:{' '}
              <span className="text-[#f5f0e8] font-medium">
                {formatDistance(result.distanceKm)}
              </span>
            </motion.p>
          </motion.div>
        </div>

        {/* Scores */}
        <AnimatePresence>
          {showScores && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 grid grid-cols-3 gap-3 sm:gap-4"
            >
              {/* Location score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#2a2a4e] p-4 text-center"
              >
                <p className="text-[10px] sm:text-xs text-[#f5f0e8]/40 mb-1.5 uppercase tracking-wider">
                  Location
                </p>
                <ScoreCounter
                  target={result.locationScore}
                  className={`text-xl sm:text-2xl font-bold ${scoreColor(result.locationScore)}`}
                />
                <p className="text-[10px] text-[#f5f0e8]/25 mt-1">/ 5,000</p>
              </motion.div>

              {/* Year score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#2a2a4e] p-4 text-center"
              >
                <p className="text-[10px] sm:text-xs text-[#f5f0e8]/40 mb-1.5 uppercase tracking-wider">
                  Year
                  <span className="text-[#f5f0e8]/25 ml-1">({yearDiffLabel})</span>
                </p>
                <ScoreCounter
                  target={result.yearScore}
                  className={`text-xl sm:text-2xl font-bold ${scoreColor(result.yearScore)}`}
                />
                <p className="text-[10px] text-[#f5f0e8]/25 mt-1">/ 5,000</p>
              </motion.div>

              {/* Round total */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-[#16213e]/80 backdrop-blur-sm rounded-xl border border-[#c9a84c]/30 p-4 text-center"
              >
                <p className="text-[10px] sm:text-xs text-[#c9a84c]/70 mb-1.5 uppercase tracking-wider">
                  Round Total
                </p>
                <ScoreCounter
                  target={result.totalScore}
                  className="text-xl sm:text-2xl font-bold text-[#c9a84c]"
                />
                <p className="text-[10px] text-[#f5f0e8]/25 mt-1">/ 10,000</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Running total + Next button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-6 flex items-center justify-between"
        >
          <p className="text-[#f5f0e8]/50 text-sm">
            Running total:{' '}
            <span className="text-[#c9a84c] font-mono font-bold tabular-nums">
              {runningTotal.toLocaleString()}
            </span>
          </p>
          <Button
            onClick={onNext}
            size="lg"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d={isLast ? 'M2 8H14M14 8L9 3M14 8L9 13' : 'M6 4L10 8L6 12'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {isLast ? 'See Final Results' : 'Next Round'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
