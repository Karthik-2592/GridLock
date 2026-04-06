export interface CellData {
  id: string;
  color: string;
  row: number;
  col: number;
}

export interface Match {
  cells: [number, number][];
  direction: 'row' | 'col';
  length: number;
}

export type GameStatus = 'menu' | 'playing' | 'won' | 'lost';

export interface GameState {
  grid: CellData[][];
  rows: number;
  cols: number;
  cost: number;
  threshold: number;
  maxRows: number;
  maxCols: number;
  status: GameStatus;
  selectedCell: [number, number] | null;
  errorCells: [number, number][] | null;
  matches: Match[];
  moves: number;
  paletteSize: number;
  recolorCost: number;
  moveCost: number;
  isEnding: 'won' | 'lost' | null;
}

export const COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#A78BFA', // purple
  '#FF9F43', // orange
  '#54A0FF', // blue
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  threshold: number;
  maxRows: number;
  maxCols: number;
  startRows: number;
  startCols: number;
  paletteSize: number;
  recolorCost: number;
  moveCost: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    startRows: 4,
    startCols: 4,
    maxRows: 10,
    maxCols: 10,
    threshold: 15,
    paletteSize: 5,
    recolorCost: 1,
    moveCost: 2,
  },
  medium: {
    startRows: 5,
    startCols: 5,
    maxRows: 9,
    maxCols: 9,
    threshold: 12,
    paletteSize: 6,
    recolorCost: 3,
    moveCost: 1,
  },
  hard: {
    startRows: 6,
    startCols: 6,
    maxRows: 8,
    maxCols: 8,
    threshold: 10,
    paletteSize: 6,
    recolorCost: 3,
    moveCost: 1,
  },
};

export type GameAction =
  | { type: 'START_GAME'; difficulty: Difficulty }
  | { type: 'SELECT_CELL'; row: number; col: number }
  | { type: 'RECOLOR_CELL'; row: number; col: number }
  | { type: 'CONFIRM_MATCH'; matchIndex: number }
  | { type: 'COMPLETE_GAME'; status: GameStatus }
  | { type: 'INVALID_SWAP'; cells: [number, number][] }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET' };
