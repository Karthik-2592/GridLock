import type { CellData, Match } from '../types';
import Cell from './Cell';
import MatchOverlay from './MatchOverlay';

interface GridProps {
  grid: CellData[][];
  maxRows: number;
  maxCols: number;
  selectedCell: [number, number] | null;
  errorCells: [number, number][] | null;
  matches: Match[];
  onCellClick: (row: number, col: number) => void;
  onCellDoubleClick: (row: number, col: number) => void;
  onConfirmMatch: (matchIndex: number) => void;
}

export default function Grid({
  grid,
  maxRows,
  maxCols,
  selectedCell,
  errorCells,
  matches,
  onCellClick,
  onCellDoubleClick,
  onConfirmMatch,
}: GridProps) {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;

  const matchCellSet = new Set<string>();
  matches.forEach(m => m.cells.forEach(([r, c]) => matchCellSet.add(`${r},${c}`)));

  const hitDeadzone = rows >= maxRows || cols >= maxCols;

  return (
    <div
      className={`relative flex items-center justify-center border-[3px] rounded-xl box-content transition-all duration-500 ease-out ${hitDeadzone
        ? 'border-[#FF6B6B] shadow-[0_0_40px_rgba(255,107,107,0.6)] bg-[#FF6B6B]/10 overflow-hidden'
        : 'border-[#FF6B6B]/20'
        }`}
      style={{
        width: `calc(${maxCols} * (var(--cell-size) + var(--gap)) - var(--gap))`,
        height: `calc(${maxRows} * (var(--cell-size) + var(--gap)) - var(--gap))`,
      }}
    >
      <div
        className="relative transition-all duration-300"
        style={{
          width: `calc(${cols} * (var(--cell-size) + var(--gap)) - var(--gap))`,
          height: `calc(${rows} * (var(--cell-size) + var(--gap)) - var(--gap))`,
        }}
      >
        <>
          {grid.flatMap((row) =>
            row.map((cell) => {
              const isSelected = selectedCell !== null && selectedCell[0] === cell.row && selectedCell[1] === cell.col;
              const isInMatch = matchCellSet.has(`${cell.row},${cell.col}`);
              const isError = errorCells?.some(e => e[0] === cell.row && e[1] === cell.col) ?? false;
              return (
                <Cell
                  key={cell.id}
                  cell={cell}
                  isSelected={isSelected}
                  isInMatch={isInMatch}
                  isError={isError}
                  onClick={() => onCellClick(cell.row, cell.col)}
                  onDoubleClick={() => onCellDoubleClick(cell.row, cell.col)}
                  style={{
                    position: 'absolute',
                    top: `calc(${cell.row} * (var(--cell-size) + var(--gap)))`,
                    left: `calc(${cell.col} * (var(--cell-size) + var(--gap)))`,
                    width: 'var(--cell-size)',
                    height: 'var(--cell-size)',
                    zIndex: isSelected ? 10 : isInMatch ? 5 : 1,
                  }}
                />
              );
            })
          )}
        </>
        <>
          {matches.map((match, i) => (
            <MatchOverlay
              key={`match-${i}-${match.cells[0][0]}-${match.cells[0][1]}-${match.direction}`}
              match={match}
              gridRows={rows}
              gridCols={cols}
              onConfirm={() => onConfirmMatch(i)}
            />
          ))}
        </>
      </div>
    </div>
  );
}
