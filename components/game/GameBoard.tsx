'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import PaintingDisplay from './PaintingDisplay';
import YearSlider from './YearSlider';
import Timer from './Timer';
import RoundResultScreen from './RoundResult';
import FinalResults from './FinalResults';
import Button from '@/components/ui/Button';
import GalleryLoader from '@/components/ui/GalleryLoader';

const GuessMap = dynamic(() => import('./GuessMap'), { ssr: false });

interface GameBoardProps {
  mode: 'standard' | 'daily';
  dailyDate?: string;
}

export default function GameBoard({ mode, dailyDate }: GameBoardProps) {
  const {
    gameState,
    settings,
    paintings,
    currentRound,
    rounds,
    totalScore,
    currentGuess,
    setGuessLocation,
    setGuessYear,
    submitGuess,
    nextRound,
    resetGame,
  } = useGameStore();

  const [mapExpanded, setMapExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const currentPainting = paintings[currentRound];
  const canSubmit = currentGuess.location !== null && currentGuess.year !== null;
  const lastResult = rounds[rounds.length - 1];

  const handleSubmit = useCallback(() => {
    submitGuess();
  }, [submitGuess]);

  const handleTimerExpire = useCallback(() => {
    if (!currentGuess.location) setGuessLocation(0, 0);
    if (currentGuess.year === null) setGuessYear(1650);
    setTimeout(() => submitGuess(), 100);
  }, [currentGuess, setGuessLocation, setGuessYear, submitGuess]);

  const handleNext = useCallback(() => {
    nextRound();
    setTimerKey((k) => k + 1);
  }, [nextRound]);

  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mapExpanded) setMapExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mapExpanded]);

  if (!currentPainting && gameState === 'playing') {
    return <GalleryLoader message="Preparing the gallery..." />;
  }

  if (gameState === 'result' && lastResult) {
    return (
      <RoundResultScreen
        result={lastResult}
        roundNumber={currentRound + 1}
        totalRounds={paintings.length}
        runningTotal={totalScore}
        onNext={handleNext}
        isLast={currentRound + 1 >= paintings.length}
      />
    );
  }

  if (gameState === 'final') {
    return (
      <FinalResults
        rounds={rounds}
        totalScore={totalScore}
        mode={mode}
        date={dailyDate}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a4e]/60 bg-[#0f0f1a]/80 backdrop-blur-md relative z-20">
        {mode === 'daily' ? (
          <motion.button
            whileHover={{ x: -2 }}
            onClick={() => window.location.href = '/'}
            className="text-[#f5f0e8]/40 hover:text-[#f5f0e8]/70 text-xs transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ x: -2 }}
            onClick={() => {
              if (confirm('Quit this game? Your progress will be lost.')) resetGame();
            }}
            className="text-[#f5f0e8]/40 hover:text-[#f5f0e8]/70 text-xs transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Quit
          </motion.button>
        )}

        {/* Round dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {paintings.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < currentRound
                    ? 'bg-[#c9a84c]'
                    : i === currentRound
                      ? 'bg-[#c9a84c] ring-2 ring-[#c9a84c]/30 ring-offset-1 ring-offset-[#0f0f1a]'
                      : 'bg-[#2a2a4e]'
                }`}
              />
            ))}
          </div>
          {settings.timerSeconds && (
            <Timer key={timerKey} seconds={settings.timerSeconds} onExpire={handleTimerExpire} />
          )}
        </div>

        <span className="text-xs font-mono text-[#c9a84c]/80 tabular-nums">
          {totalScore.toLocaleString()}
        </span>
      </div>

      {/* Main game area */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-49px)]">
        {/* Left: Painting with vignette */}
        <div className={`h-[40vh] lg:h-full bg-[#0a0a14] flex items-center justify-center overflow-hidden relative transition-all duration-300 ${lightboxOpen ? 'lg:w-full' : 'lg:w-[55%]'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
          <PaintingDisplay
            imageUrl={currentPainting.imageUrl}
            title={currentPainting.title}
            showHint={settings.difficulty === 'easy'}
            nationality={currentPainting.nationality}
            blurred={settings.difficulty === 'hard'}
            onLightboxChange={setLightboxOpen}
          />
        </div>

        {/* Right: Controls — collapses when lightbox is open */}
        <div className={`flex flex-col bg-[#12122a] border-l border-[#2a2a4e]/40 overflow-y-auto transition-all duration-300 ${lightboxOpen ? 'lg:w-0 lg:overflow-hidden h-0 lg:h-auto' : 'lg:w-[45%]'}`}>
          <div className="p-5 flex-1 flex flex-col gap-5">
            {/* Map section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-[#f5f0e8]/40 uppercase tracking-[0.12em]">
                  Where was this painted?
                </h3>
                <button
                  onClick={() => setMapExpanded(!mapExpanded)}
                  className="text-[10px] text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors lg:hidden"
                >
                  {mapExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <GuessMap
                onLocationSelect={(lat, lng) => setGuessLocation(lat, lng)}
                selectedLocation={currentGuess.location}
                expanded={mapExpanded}
              />
              <AnimatePresence>
                {currentGuess.location && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-[#f5f0e8]/30 text-center mt-2"
                  >
                    {currentGuess.location.lat.toFixed(2)}, {currentGuess.location.lng.toFixed(2)}
                    <span className="ml-2 text-[#c9a84c]/40">Drag to adjust</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Year slider */}
            <div>
              <h3 className="text-xs font-medium text-[#f5f0e8]/40 uppercase tracking-[0.12em] mb-2">
                When was this painted?
              </h3>
              <YearSlider
                onYearChange={(year) => setGuessYear(year)}
                selectedYear={currentGuess.year}
              />
            </div>

            {/* Submit */}
            <div className="mt-auto pt-4">
              <motion.div
                animate={canSubmit ? { scale: [1, 1.01, 1] } : {}}
                transition={canSubmit ? { duration: 2, repeat: Infinity } : {}}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  size="lg"
                  className={`w-full transition-all duration-500 ${canSubmit ? 'animate-pulse-gold' : ''}`}
                >
                  Submit Guess
                </Button>
              </motion.div>
              <AnimatePresence>
                {!canSubmit && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-[#f5f0e8]/25 text-center mt-2"
                  >
                    {!currentGuess.location && currentGuess.year === null
                      ? 'Place a pin and select a year'
                      : !currentGuess.location
                        ? 'Place a pin on the map'
                        : 'Select a year on the timeline'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile expanded map overlay */}
      <AnimatePresence>
        {mapExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0f0f1a] lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a4e]">
              <h3 className="text-sm font-medium">Select Location</h3>
              <button onClick={() => setMapExpanded(false)} className="text-[#c9a84c] text-sm font-medium">
                Done
              </button>
            </div>
            <div className="flex-1 p-2">
              <GuessMap
                onLocationSelect={(lat, lng) => setGuessLocation(lat, lng)}
                selectedLocation={currentGuess.location}
                expanded
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
