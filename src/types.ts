export type GameMode = 'continue' | 'challenge';
export type ContinueRate = 0.29 | 0.5 | 0.7 | 0.81 | 0.9 | 0.99;
export type Symbol = '🍒' | '🍋' | '🍇' | '💎' | '🔔' | '🌠';
export type GameScreen = 'home' | 'game' | 'result';

export interface GameState {
  currentScreen: GameScreen;
  mode: GameMode;
  continueRate: ContinueRate;
  continueCount: number;
  remainingStops: number;
  reels: (Symbol | null)[][];
  isSpinning: boolean[];
  cherryOccurred: boolean;
  showDrinkModal: boolean;
  drinkCount: number;
}