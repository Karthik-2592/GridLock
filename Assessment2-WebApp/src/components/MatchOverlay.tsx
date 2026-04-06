import type { Match } from '../types';
import MatchButton from './MatchButton';

interface MatchOverlayProps {
  match: Match;
  gridRows: number;
  gridCols: number;
  onConfirm: () => void;
}

export default function MatchOverlay({ match, gridRows, gridCols, onConfirm }: MatchOverlayProps) {
  const minRow = Math.min(...match.cells.map(c => c[0]));
  const maxRow = Math.max(...match.cells.map(c => c[0]));
  const minCol = Math.min(...match.cells.map(c => c[1]));
  const maxCol = Math.max(...match.cells.map(c => c[1]));

  const top = `calc(${minRow} * (var(--cell-size) + var(--gap)))`;
  const left = `calc(${minCol} * (var(--cell-size) + var(--gap)))`;
  const width = `calc(${maxCol - minCol + 1} * (var(--cell-size) + var(--gap)) - var(--gap))`;
  const height = `calc(${maxRow - minRow + 1} * (var(--cell-size) + var(--gap)) - var(--gap))`;

  const isUniform =
    (match.direction === 'row' && match.length === gridCols) ||
    (match.direction === 'col' && match.length === gridRows);

  const overlayBg = isUniform ? 'rgba(167, 139, 250, 0.15)' : 'rgba(255, 215, 0, 0.12)';
  const overlayBorder = isUniform ? '2px solid rgba(167, 139, 250, 0.6)' : '2px solid rgba(255, 215, 0, 0.35)';

  return (
    <div
      className="pointer-events-none absolute rounded-sm animate-fade-in"
      style={{
        top,
        left,
        width,
        height,
        backgroundColor: overlayBg,
        border: overlayBorder,
        boxShadow: isUniform ? '0 0 20px rgba(167, 139, 250, 0.3)' : 'none',
        zIndex: 10,
      }}
    >
      <div className="pointer-events-auto">
        <MatchButton onClick={onConfirm} />
      </div>
    </div>
  );
}
