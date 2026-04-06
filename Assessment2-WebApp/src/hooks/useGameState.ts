import { useReducer, useCallback, useEffect } from 'react';
import type { GameState, GameStatus, GameAction, CellData, Match, Difficulty } from '../types';
import { COLORS, DIFFICULTY_CONFIGS } from '../types';

function randomColor(paletteSize: number): string {
  return COLORS[Math.floor(Math.random() * paletteSize)];
}

function createCell(row: number, col: number, paletteSize: number): CellData {
  return {
    id: `${row}-${col}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    color: randomColor(paletteSize),
    row,
    col,
  };
}

function initGrid(rows: number, cols: number, paletteSize: number): CellData[][] {
  const grid: CellData[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: CellData[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(createCell(r, c, paletteSize));
    }
    grid.push(row);
  }
  return grid;
}

function isAdjacent(a: [number, number], b: [number, number]): boolean {
  const dr = Math.abs(a[0] - b[0]);
  const dc = Math.abs(a[1] - b[1]);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

function detectMatches(grid: CellData[][]): Match[] {
  const matches: Match[] = [];
  const rows = grid.length;
  if (rows === 0) return matches;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    let start = 0;
    while (start < cols) {
      const color = grid[r][start].color;
      let end = start;
      while (end + 1 < cols && grid[r][end + 1].color === color) end++;
      const length = end - start + 1;
      const minMatchLength = cols <= 2 ? 2 : 3;
      if (length >= minMatchLength) {
        const cells: [number, number][] = [];
        for (let c = start; c <= end; c++) cells.push([r, c]);
        matches.push({ cells, direction: 'row', length });
      }
      start = end + 1;
    }
  }

  for (let c = 0; c < cols; c++) {
    let start = 0;
    while (start < rows) {
      const color = grid[start][c].color;
      let end = start;
      while (end + 1 < rows && grid[end + 1][c].color === color) end++;
      const length = end - start + 1;
      const minMatchLength = rows <= 2 ? 2 : 3;
      if (length >= minMatchLength) {
        const cells: [number, number][] = [];
        for (let r = start; r <= end; r++) cells.push([r, c]);
        matches.push({ cells, direction: 'col', length });
      }
      start = end + 1;
    }
  }

  return matches;
}

function isUniformRow(grid: CellData[][], row: number): boolean {
  const color = grid[row][0].color;
  return grid[row].every(cell => cell.color === color);
}

function isUniformCol(grid: CellData[][], col: number): boolean {
  const color = grid[0][col].color;
  return grid.every(row => row[col].color === color);
}

function expandGrid(grid: CellData[][], paletteSize: number): CellData[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = grid.map((row, r) => [...row, createCell(r, cols, paletteSize)]);
  const newRow: CellData[] = [];
  for (let c = 0; c <= cols; c++) newRow.push(createCell(rows, c, paletteSize));
  newGrid.push(newRow);
  return newGrid;
}

function removeRow(grid: CellData[][], rowIndex: number): CellData[][] {
  return grid
    .filter((_, i) => i !== rowIndex)
    .map((row, r) => row.map(cell => ({ ...cell, row: r })));
}

function removeCol(grid: CellData[][], colIndex: number): CellData[][] {
  return grid.map((row, r) =>
    row.filter((_, c) => c !== colIndex).map((cell, c) => ({ ...cell, col: c, row: r }))
  );
}

function swapCells(grid: CellData[][], a: [number, number], b: [number, number]): CellData[][] {
  const newGrid = [...grid];
  
  if (a[0] === b[0]) {
    newGrid[a[0]] = [...newGrid[a[0]]];
  } else {
    newGrid[a[0]] = [...newGrid[a[0]]];
    newGrid[b[0]] = [...newGrid[b[0]]];
  }

  const cellA = { ...newGrid[a[0]][a[1]], row: b[0], col: b[1] };
  const cellB = { ...newGrid[b[0]][b[1]], row: a[0], col: a[1] };

  newGrid[a[0]][a[1]] = cellB;
  newGrid[b[0]][b[1]] = cellA;
  
  return newGrid;
}

const _default = DIFFICULTY_CONFIGS.medium;

const initialState: GameState = {
  grid: [],
  rows: 0,
  cols: 0,
  cost: 0,
  threshold: _default.threshold,
  maxRows: _default.maxRows,
  maxCols: _default.maxCols,
  status: 'menu',
  selectedCell: null,
  errorCells: null,
  matches: [],
  moves: 0,
  paletteSize: _default.paletteSize,
  recolorCost: _default.recolorCost,
  moveCost: _default.moveCost,
  isEnding: null,
};

function processPostAction(state: GameState): GameState {
  let { cost, grid, rows, cols, status, moveCost, isEnding } = state;

  if (cost >= state.threshold) {
    cost = 0;
    grid = expandGrid(grid, state.paletteSize);
    rows = grid.length;
    cols = grid[0].length;
    
    if (rows >= state.maxRows || cols >= state.maxCols) {
      isEnding = 'lost';
    }
  }

  const matches = detectMatches(grid);

  if (rows === 0 || cols === 0) isEnding = 'won';

  return { ...state, grid, cost, rows, cols, status, matches, moveCost, isEnding };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const config = DIFFICULTY_CONFIGS[action.difficulty];
      const { startRows, startCols, paletteSize, recolorCost, moveCost, threshold, maxRows, maxCols } = config;
      const grid = initGrid(startRows, startCols, paletteSize);
      const matches = detectMatches(grid);
      return {
        ...state,
        grid,
        rows: startRows,
        cols: startCols,
        cost: 0,
        threshold,
        maxRows,
        maxCols,
        status: 'playing',
        selectedCell: null,
        errorCells: null,
        matches,
        moves: 0,
        paletteSize,
        recolorCost,
        moveCost,
      };
    }

    case 'SELECT_CELL': {
      if (state.status !== 'playing') return state;
      const { row, col } = action;
      const target: [number, number] = [row, col];

      if (!state.selectedCell) {
        return { ...state, selectedCell: target };
      }

      if (state.selectedCell[0] === row && state.selectedCell[1] === col) {
        return { ...state, selectedCell: null };
      }

      if (isAdjacent(state.selectedCell, target)) {
        const newGrid = swapCells(state.grid, state.selectedCell, target);
        return processPostAction({
          ...state,
          grid: newGrid,
          cost: state.cost + state.moveCost,
          selectedCell: null,
          errorCells: null,
          moves: state.moves + 1,
        });
      }

      // If not adjacent, it's an invalid swap
      return {
        ...state,
        selectedCell: null,
        errorCells: [state.selectedCell, target],
      };
    }

    case 'CLEAR_ERROR': {
      return { ...state, errorCells: null };
    }

    case 'RECOLOR_CELL': {
      if (state.status !== 'playing') return state;
      const { row, col } = action;
      const newGrid = [...state.grid];
      newGrid[row] = [...newGrid[row]];
      const current = newGrid[row][col].color;
      let next = randomColor(state.paletteSize);
      let attempts = 0;
      while (next === current && attempts < 10) {
        next = randomColor(state.paletteSize);
        attempts++;
      }
      newGrid[row][col] = { ...newGrid[row][col], color: next };

      return processPostAction({
        ...state,
        grid: newGrid,
        cost: state.cost + state.recolorCost,
        selectedCell: null,
        errorCells: null,
        moves: state.moves + 1,
      });
    }

    case 'CONFIRM_MATCH': {
      if (state.status !== 'playing') return state;
      const match = state.matches[action.matchIndex];
      if (!match) return state;

      const matchBonus = match.length - 1;
      const newCost = Math.max(0, state.cost - matchBonus);
      let newGrid = [...state.grid];
      let newRows = state.rows;
      let newCols = state.cols;

      if (match.direction === 'row') {
        const row = match.cells[0][0];
        if (match.length === state.cols && isUniformRow(state.grid, row)) {
          newGrid = removeRow(newGrid, row);
          newRows--;
        } else {
          // Replace cells with random new colored cells in the same row
          newGrid[row] = [...newGrid[row]];
          match.cells.forEach(([r, c]) => {
            newGrid[r][c] = createCell(r, c, state.paletteSize);
          });
        }
      } else {
        const col = match.cells[0][1];
        if (match.length === state.rows && isUniformCol(state.grid, col)) {
          newGrid = removeCol(newGrid, col);
          newCols--;
        } else {
          // Replace cells in different rows for horizontal match? No, vertical match.
          // For vertical match, multiple rows are affected.
          match.cells.forEach(([r, c]) => {
            newGrid[r] = [...newGrid[r]];
            newGrid[r][c] = createCell(r, c, state.paletteSize);
          });
        }
      }

      let newStatus: GameStatus = state.status;
      let newEnding: 'won' | 'lost' | null = state.isEnding;
      if (newRows === 0 || newCols === 0) newEnding = 'won';

      return {
        ...state,
        grid: newGrid,
        rows: newRows,
        cols: newCols,
        cost: newCost,
        matches: detectMatches(newGrid),
        selectedCell: null,
        errorCells: null,
        status: newStatus,
        isEnding: newEnding,
      };
    }


    case 'COMPLETE_GAME': {
      return { ...state, status: action.status, isEnding: null };
    }

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback((difficulty: Difficulty) => dispatch({ type: 'START_GAME', difficulty }), []);
  const selectCell = useCallback((row: number, col: number) => {
    dispatch({ type: 'SELECT_CELL', row, col });
  }, []);
  const recolorCell = useCallback((row: number, col: number) => dispatch({ type: 'RECOLOR_CELL', row, col }), []);
  const confirmMatch = useCallback((matchIndex: number) => dispatch({ type: 'CONFIRM_MATCH', matchIndex }), []);
  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);


  useEffect(() => {
    if (state.isEnding) {
      const delay = 600;
      const timer = setTimeout(() => {
        dispatch({ type: 'COMPLETE_GAME', status: state.isEnding! });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [state.isEnding]);

  return { state, startGame, selectCell, recolorCell, confirmMatch, clearError, reset };
}