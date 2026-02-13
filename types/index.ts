export interface PaintingLocation {
  lat: number;
  lng: number;
  name: string;
}

export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: number;
  yearStart?: number;
  yearEnd?: number;
  yearDisplay: string;
  location: PaintingLocation;
  imageUrl: string;
  description: string;
  nationality: string;
  medium?: string;
  source: 'met_api' | 'fallback';
}

export interface PlayerGuess {
  location: { lat: number; lng: number } | null;
  year: number | null;
}

export interface RoundResult {
  painting: Painting;
  guess: PlayerGuess;
  distanceKm: number;
  yearDifference: number;
  locationScore: number;
  yearScore: number;
  totalScore: number;
}

export interface GameSession {
  id: string;
  mode: 'standard' | 'daily';
  difficulty: 'easy' | 'normal' | 'hard';
  timerSeconds: number | null;
  rounds: RoundResult[];
  currentRound: number;
  paintings: Painting[];
  totalScore: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface DailyChallenge {
  date: string;
  paintings: Painting[];
  seed: number;
}

export type GameState = 'home' | 'settings' | 'playing' | 'result' | 'final';

export interface GameSettings {
  timerSeconds: number | null;
  difficulty: 'easy' | 'normal' | 'hard';
}
