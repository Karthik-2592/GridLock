import type { CellData } from '../types';
import { useRef, useState, useEffect } from 'react';

interface CellProps {
  cell: CellData;
  isSelected: boolean;
  isInMatch: boolean;
  isError?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  style?: React.CSSProperties;
}

export default function Cell({ 
  cell, 
  isSelected, 
  isInMatch, 
  isError, 
  onClick, 
  onDoubleClick, 
  style 
}: CellProps) {
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      onClick();
    }, 50);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      className={`cursor-pointer rounded-[2px] transition-all duration-[50ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-90 ${
        mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
      style={{
        ...style,
        backgroundColor: cell.color,
        boxShadow: isError
          ? '0 0 0 4px #FF6B6B, 0 0 24px rgba(255, 107, 107, 0.6)'
          : isSelected
          ? '0 0 0 6px #FFFFFF, 0 0 40px rgba(255, 255, 255, 0.6)'
          : isInMatch
            ? '0 0 0 2px rgba(255, 215, 0, 0.5), 0 0 12px rgba(255, 215, 0, 0.2)'
            : '0 4px 12px rgba(0,0,0,0.4)',
        animation: isError 
          ? 'shake-error 0.4s ease-in-out' 
          : isSelected 
            ? 'pulse-accent 1.5s ease-in-out infinite' 
            : undefined,
      }}
    >
      {isInMatch && (
        <div
          className="pointer-events-none absolute inset-0 rounded-sm"
          style={{ backgroundColor: 'rgba(255, 215, 0, 0.15)' }}
        />
      )}
    </div>
  );
}
