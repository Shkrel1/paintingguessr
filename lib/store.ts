'use client';

import { create } from 'zustand';
import { GameState, GameSettings, Painting, PlayerGuess, RoundResult } from '@/types';
import { haversineDistance, calculateLocationScore, calculateYearScore, calculateYearDifference } from './scoring';

interface GameStore {
  // Game state
  gameState: GameState;
  settings: GameSettings;
  mode: 'standard' | 'daily';
  paintings: Painting[];
  currentRound: number;
  rounds: RoundResult[];
  totalScore: number;
  sessionId: string;

  // Current guess
  currentGuess: PlayerGuess;

  // Actions
  setGameState: (state: GameState) => void;
  setSettings: (settings: GameSettings) => void;
  startGame: (paintings: Painting[], mode: 'standard' | 'daily', sessionId: string) => void;
  resumeGame: (data: { paintings: Painting[]; currentRound: number; rounds: RoundResult[]; totalScore: number; sessionId: string }) => void;
  setGuessLocation: (lat: number, lng: number) => void;
  setGuessYear: (year: number) => void;
  submitGuess: () => RoundResult | null;
  nextRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'home',
  settings: { timerSeconds: null, difficulty: 'normal' },
  mode: 'standard',
  paintings: [],
  currentRound: 0,
  rounds: [],
  totalScore: 0,
  sessionId: '',
  currentGuess: { location: null, year: null },

  setGameState: (gameState) => set({ gameState }),

  setSettings: (settings) => set({ settings }),

  startGame: (paintings, mode, sessionId) =>
    set({
      paintings,
      mode,
      sessionId,
      currentRound: 0,
      rounds: [],
      totalScore: 0,
      gameState: 'playing',
      currentGuess: { location: null, year: null },
    }),

  resumeGame: (data) =>
    set({
      paintings: data.paintings,
      mode: 'daily',
      sessionId: data.sessionId,
      currentRound: data.currentRound,
      rounds: data.rounds,
      totalScore: data.totalScore,
      gameState: 'playing',
      currentGuess: { location: null, year: null },
    }),

  setGuessLocation: (lat, lng) =>
    set({ currentGuess: { ...get().currentGuess, location: { lat, lng } } }),

  setGuessYear: (year) =>
    set({ currentGuess: { ...get().currentGuess, year } }),

  submitGuess: () => {
    const { currentGuess, settings, paintings, currentRound } = get();
    const isEasy = settings.difficulty === 'easy';

    if (!isEasy && !currentGuess.location) return null;
    if (currentGuess.year === null) return null;

    const painting = paintings[currentRound];
    const distanceKm = currentGuess.location
      ? haversineDistance(
          currentGuess.location.lat,
          currentGuess.location.lng,
          painting.location.lat,
          painting.location.lng
        )
      : 0;
    const yearDifference = calculateYearDifference(currentGuess.year, painting.year, painting.yearStart, painting.yearEnd);
    const locationScore = currentGuess.location ? calculateLocationScore(distanceKm) : 0;
    const yearScore = calculateYearScore(currentGuess.year, painting.year, painting.yearStart, painting.yearEnd);

    const result: RoundResult = {
      painting,
      guess: { ...currentGuess },
      distanceKm,
      yearDifference,
      locationScore,
      yearScore,
      totalScore: locationScore + yearScore,
    };

    set((state) => ({
      rounds: [...state.rounds, result],
      totalScore: state.totalScore + result.totalScore,
      gameState: 'result',
    }));

    return result;
  },

  nextRound: () => {
    const { currentRound, paintings } = get();
    if (currentRound + 1 >= paintings.length) {
      set({ gameState: 'final' });
    } else {
      set({
        currentRound: currentRound + 1,
        gameState: 'playing',
        currentGuess: { location: null, year: null },
      });
    }
  },

  resetGame: () =>
    set({
      gameState: 'home',
      paintings: [],
      currentRound: 0,
      rounds: [],
      totalScore: 0,
      sessionId: '',
      currentGuess: { location: null, year: null },
    }),
}));
