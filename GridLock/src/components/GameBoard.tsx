import Grid from './Grid';
import CostBar from './CostBar';
import { useOrientation } from '../hooks/useOrientation';
import { useEffect } from 'react';
import type { GameState } from '../types';

interface GameBoardProps {
  state: GameState;
  selectCell: (row: number, col: number) => void;
  recolorCell: (row: number, col: number) => void;
  confirmMatch: (matchIndex: number) => void;
  clearError: () => void;
}

export default function GameBoard({ state, selectCell, recolorCell, confirmMatch, clearError }: GameBoardProps) {
  const { isPortrait } = useOrientation();
  const { grid, selectedCell, errorCells, matches, cost, threshold, rows, cols, maxRows, maxCols, moves } = state;

  useEffect(() => {
    if (errorCells) {
      const timer = setTimeout(() => {
        clearError();
      }, 500); // 500ms shake duration
      return () => clearTimeout(timer);
    }
  }, [errorCells, clearError]);

  return (
    <div
      className={`flex ${isPortrait ? 'flex-col' : 'flex-row'} items-center justify-center gap-16 sm:gap-32 px-4 sm:px-24 mb-12 animate-fade-in`}
    >
      {/* Cost Bar */}
      <div className={`${isPortrait ? 'order-3' : 'order-1'}`}>
        <CostBar 
          cost={cost} 
          threshold={threshold} 
          orientation={isPortrait ? 'horizontal' : 'vertical'} 
        />
      </div>

      {/* Grid Area */}
      <div className={`flex flex-col items-center gap-4 ${isPortrait ? 'order-2' : 'order-2'}`}>
        <Grid
          grid={grid}
          maxRows={maxRows}
          maxCols={maxCols}
          selectedCell={selectedCell}
          errorCells={errorCells}
          matches={matches}
          onCellClick={selectCell}
          onCellDoubleClick={recolorCell}
          onConfirmMatch={confirmMatch}
        />
      </div>

      {/* Info Panel */}
      <div
        className={`flex ${isPortrait ? 'flex-row overflow-x-auto w-full justify-center order-1' : 'flex-col w-48 order-3'} gap-4 animate-slide-in-right mb-4 sm:mb-0`}
      >
        <InfoCard label="Grid" value={`${rows}×${cols}`} />
        <InfoCard label="Dead" value={`${maxRows}×${maxCols}`} accent="danger" />
        <InfoCard label="Moves" value={`${moves}`} />
        <InfoCard label="Matches" value={`${matches.length}`} accent="gold" />
      </div>
    </div>
  );
}

function InfoCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  const color =
    accent === 'danger' ? '#FF6B6B' : accent === 'gold' ? '#FFD700' : '#7AFFC4';
  return (
    <div
      className="rounded-[20px] px-8 py-5 text-center transition-transform hover:scale-105"
      style={{ backgroundColor: '#1A1B23', border: '2px solid #22232E', minWidth: '120px' }}
    >
      <div className="text-xs font-black uppercase tracking-widest" style={{ color: '#8892A4', marginBottom: 4 }}>
        {label}
      </div>
      <div className="text-3xl font-black" style={{ color, letterSpacing: '-1px' }}>
        {value}
      </div>
    </div>
  );
}
