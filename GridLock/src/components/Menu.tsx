import type { Difficulty } from '../types';
import HowToPlay from './HowToPlay';

interface MenuProps {
  onStart: (difficulty: Difficulty) => void;
}

const DIFFICULTY_META: { key: Difficulty; label: string; desc: string; grid: string; dead: string; pressure: number; gradient: string; glow: string }[] = [
  {
    key: 'easy',
    label: 'EASY',
    desc: 'Relaxed pace',
    grid: '4×4',
    dead: '10×10',
    pressure: 15,
    gradient: 'linear-gradient(135deg, #7AFFC4 0%, #4ECDC4 100%)',
    glow: 'rgba(122, 255, 196, 0.35)',
  },
  {
    key: 'medium',
    label: 'MEDIUM',
    desc: 'Balanced challenge',
    grid: '5×5',
    dead: '9×9',
    pressure: 12,
    gradient: 'linear-gradient(135deg, #FFE66D 0%, #FF9F43 100%)',
    glow: 'rgba(255, 230, 109, 0.35)',
  },
  {
    key: 'hard',
    label: 'HARD',
    desc: 'Maximum pressure',
    grid: '6×6',
    dead: '8×8',
    pressure: 10,
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #c0392b 100%)',
    glow: 'rgba(255, 107, 107, 0.35)',
  },
];

export default function Menu({ onStart }: MenuProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-8 animate-fade-in">
      <div className="text-center animate-slide-in-top">
        <h1
          className="text-7xl font-black tracking-tighter"
          style={{ color: '#7AFFC4', animation: 'glow 3s ease-in-out infinite' }}
        >
          GRIDLOCK
        </h1>
        <p className="mt-3 text-lg" style={{ color: '#8892A4' }}>
          Shrink the grid to 1×1. Don't let it expand beyond the dead-zone.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom">
        {DIFFICULTY_META.map(({ key, label, desc, grid, dead, pressure, gradient, glow }) => (
          <button
            key={key}
            id={`start-${key}-btn`}
            onClick={() => onStart(key)}
            className="flex flex-col items-center gap-2 cursor-pointer rounded-xl px-8 py-5 font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: gradient,
              color: '#0F1117',
              boxShadow: `0 0 28px ${glow}`,
              minWidth: '140px',
            }}
          >
            <span className="text-base font-black">{label}</span>
            <span className="text-[11px] font-semibold opacity-70">{desc}</span>
            <div className="mt-1 flex flex-col items-center gap-0.5 text-[10px] font-bold opacity-60">
              <span>Start {grid}</span>
              <span>Dead {dead}</span>
              <span>P-Max {pressure}</span>
            </div>
          </button>
        ))}
      </div>

      <HowToPlay />
    </div>
  );
}
