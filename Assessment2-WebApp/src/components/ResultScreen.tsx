interface ResultScreenProps {
  won: boolean;
  moves: number;
  gridSize: [number, number];
  onPlayAgain: () => void;
}

export default function ResultScreen({ won, moves, gridSize, onPlayAgain }: ResultScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(15, 17, 23, 0.85)' }}
    >
      <div
        className="flex flex-col items-center gap-8 rounded-3xl p-14 text-center animate-zoom-in"
        style={{
          backgroundColor: '#1A1B23',
          border: `2px solid ${won ? 'rgba(122, 255, 196, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`,
          boxShadow: won
            ? '0 0 60px rgba(122, 255, 196, 0.15)'
            : '0 0 60px rgba(255, 107, 107, 0.15)',
        }}
      >
        <div
          className="text-6xl font-black tracking-tighter animate-slide-in-top"
          style={{ color: won ? '#7AFFC4' : '#FF6B6B' }}
        >
          {won ? 'YOU WIN!' : 'GAME OVER'}
        </div>

        <p className="text-lg" style={{ color: '#8892A4' }}>
          {won
            ? 'You compressed the grid to a single cell!'
            : 'The grid expanded beyond the dead-zone.'}
        </p>

        <div
          className="flex gap-8 rounded-xl px-6 py-3"
          style={{ backgroundColor: '#22232E' }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#E2E8F0' }}>
              {moves}
            </div>
            <div className="text-xs" style={{ color: '#8892A4' }}>
              Moves
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#E2E8F0' }}>
              {gridSize[0]}×{gridSize[1]}
            </div>
            <div className="text-xs" style={{ color: '#8892A4' }}>
              Final Grid
            </div>
          </div>
        </div>

        <button
          id="play-again-btn"
          onClick={onPlayAgain}
          className="cursor-pointer rounded-xl px-8 py-3 text-base font-bold tracking-wide transition-all duration-300 hover:scale-105"
          style={{
            background: won
              ? 'linear-gradient(135deg, #7AFFC4 0%, #4ECDC4 100%)'
              : 'linear-gradient(135deg, #FF6B6B 0%, #FF9F43 100%)',
            color: '#0F1117',
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}