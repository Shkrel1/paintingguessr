'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
  const [mapFocused, setMapFocused] = useState(false);
  const [mobileLightbox, setMobileLightbox] = useState(false);

  const currentPainting = paintings[currentRound];
  const isEasy = settings.difficulty === 'easy';
  const canSubmit = isEasy
    ? currentGuess.year !== null
    : currentGuess.location !== null && currentGuess.year !== null;
  const lastResult = rounds[rounds.length - 1];

  const handleSubmit = useCallback(() => {
    submitGuess();
  }, [submitGuess]);

  const handleTimerExpire = useCallback(() => {
    if (!isEasy && !currentGuess.location) setGuessLocation(0, 0);
    if (currentGuess.year === null) setGuessYear(1650);
    setTimeout(() => submitGuess(), 100);
  }, [currentGuess, isEasy, setGuessLocation, setGuessYear, submitGuess]);

  const handleNext = useCallback(() => {
    nextRound();
    setTimerKey((k) => k + 1);
  }, [nextRound]);

  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileLightbox) setMobileLightbox(false);
        else if (mapExpanded) setMapExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mapExpanded, mobileLightbox]);

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
        difficulty={settings.difficulty}
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
        difficulty={settings.difficulty}
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

      {/* ===== MOBILE LAYOUT (PiP swap) ===== */}
      <div className="flex flex-col h-[calc(100vh-49px)] lg:hidden">
        {/* Primary visual area */}
        <div className="relative flex-1 min-h-0 bg-[#0a0a14]">
          {/* Painting layer */}
          <div
            className={`absolute transition-all duration-300 overflow-hidden ${
              !isEasy && mapFocused
                ? 'bottom-3 right-3 w-[30vw] aspect-[4/3] rounded-lg border-2 border-[#f5f0e8]/20 shadow-xl z-20 cursor-pointer'
                : 'inset-0 z-10'
            }`}
            onClick={!isEasy && mapFocused ? () => setMapFocused(false) : undefined}
          >
            {!isEasy && mapFocused ? (
              /* PiP thumbnail — bare image, no frame/lightbox */
              <div className="relative w-full h-full bg-[#0a0a14]">
                <Image
                  src={currentPainting.imageUrl}
                  alt={currentPainting.title}
                  fill
                  className={`object-cover ${settings.difficulty === 'hard' ? 'blur-md' : ''}`}
                  unoptimized
                />
                {/* Swap indicator */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/70">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ) : (
              /* Full painting view */
              <>
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
                <div className="w-full h-full flex items-center justify-center">
                  <PaintingDisplay
                    imageUrl={currentPainting.imageUrl}
                    title={currentPainting.title}
                    nationality={currentPainting.nationality}
                    blurred={settings.difficulty === 'hard'}
                  />
                </div>
                {/* Tap overlay — intercepts taps to open mobile lightbox instead of PaintingDisplay's built-in one */}
                <div
                  className="absolute inset-0 z-10"
                  onClick={() => setMobileLightbox(true)}
                />
              </>
            )}
          </div>

          {/* Map layer — hidden in easy mode */}
          {!isEasy && (
            <div
              className={`absolute transition-all duration-300 overflow-hidden ${
                mapFocused
                  ? 'inset-0 z-10'
                  : 'bottom-3 right-3 w-[30vw] aspect-[4/3] rounded-lg border-2 border-[#f5f0e8]/20 shadow-xl z-20'
              }`}
            >
              <GuessMap
                onLocationSelect={(lat, lng) => setGuessLocation(lat, lng)}
                selectedLocation={currentGuess.location}
                className="h-full"
              />
              {/* When map is PiP, overlay blocks interactions and captures tap to swap */}
              {!mapFocused && (
                <div
                  className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/10"
                  onClick={() => setMapFocused(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/70">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls footer — always visible */}
        <div className="shrink-0 px-4 py-3 bg-[#12122a] border-t border-[#2a2a4e]/40">
          <YearSlider
            onYearChange={(year) => setGuessYear(year)}
            selectedYear={currentGuess.year}
          />
          <div className="mt-3">
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
            {!isEasy && currentGuess.location && (
              <p className="text-[10px] text-[#f5f0e8]/30 text-center mt-2">
                {currentGuess.location.lat.toFixed(2)}, {currentGuess.location.lng.toFixed(2)}
                <span className="ml-2 text-[#c9a84c]/40">Drag to adjust</span>
              </p>
            )}
            {!canSubmit && (
              <p className="text-[10px] text-[#f5f0e8]/25 text-center mt-1">
                {isEasy
                  ? 'Select a year on the timeline'
                  : !currentGuess.location && currentGuess.year === null
                    ? 'Place a pin and select a year'
                    : !currentGuess.location
                      ? 'Place a pin on the map'
                      : 'Select a year on the timeline'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile painting lightbox */}
      <AnimatePresence>
        {mobileLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 lg:hidden"
            onClick={() => setMobileLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentPainting.imageUrl}
                alt={currentPainting.title}
                width={1600}
                height={1200}
                className={`max-w-full max-h-[90vh] object-contain ${settings.difficulty === 'hard' ? 'blur-md' : ''}`}
                unoptimized
              />
              {settings.difficulty === 'hard' && (
                <p className="mt-4 px-5 py-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full text-[#c9a84c] text-sm font-serif font-medium italic">
                  {currentPainting.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:flex lg:flex-row h-[calc(100vh-49px)]">
        {/* Left: Painting with vignette */}
        <div className={`h-full bg-[#0a0a14] flex items-center justify-center overflow-hidden relative transition-all duration-300 ${lightboxOpen || isEasy ? 'lg:w-full' : 'lg:w-[55%]'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
          <PaintingDisplay
            imageUrl={currentPainting.imageUrl}
            title={currentPainting.title}
            nationality={currentPainting.nationality}
            blurred={settings.difficulty === 'hard'}
            onLightboxChange={setLightboxOpen}
          />
        </div>

        {/* Right: Controls — collapses when lightbox is open; hidden entirely in easy mode (controls overlay bottom) */}
        {!isEasy && (
          <div className={`flex flex-col bg-[#12122a] border-l border-[#2a2a4e]/40 overflow-y-auto transition-all duration-300 ${lightboxOpen ? 'lg:w-0 lg:overflow-hidden' : 'lg:w-[45%]'}`}>
            <div className="p-5 flex-1 flex flex-col gap-5">
              {/* Map section */}
              <div>
                <h3 className="text-xs font-medium text-[#f5f0e8]/40 uppercase tracking-[0.12em] mb-2">
                  Where was this painted?
                </h3>
                <GuessMap
                  onLocationSelect={(lat, lng) => setGuessLocation(lat, lng)}
                  selectedLocation={currentGuess.location}
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
        )}
      </div>

      {/* Desktop easy mode: year slider + submit pinned to bottom */}
      {isEasy && (
        <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-30 bg-[#12122a]/95 backdrop-blur-md border-t border-[#2a2a4e]/40 px-8 py-4">
          <div className="max-w-2xl mx-auto flex items-end gap-6">
            <div className="flex-1">
              <YearSlider
                onYearChange={(year) => setGuessYear(year)}
                selectedYear={currentGuess.year}
              />
            </div>
            <motion.div
              animate={canSubmit ? { scale: [1, 1.01, 1] } : {}}
              transition={canSubmit ? { duration: 2, repeat: Infinity } : {}}
              className="shrink-0"
            >
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                size="lg"
                className={`min-w-[180px] transition-all duration-500 ${canSubmit ? 'animate-pulse-gold' : ''}`}
              >
                Submit Guess
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
