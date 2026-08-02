import { useState } from 'react';

interface Slide {
  title: string;
  icon: string;
  accent: string;
  body: React.ReactNode;
}

const SLIDES: Slide[] = [
  {
    title: 'Swap & Recolor',
    icon: '🔀',
    accent: '#7AFFC4',
    body: (
      <>
        <p><strong style={{ color: '#7AFFC4' }}>Click</strong> any cell to select it, then click an <strong style={{ color: '#7AFFC4' }}>adjacent</strong> cell to swap their positions.</p>
        <p className="mt-2"><strong style={{ color: '#7AFFC4' }}>Double-click</strong> a cell to randomly recolor it. Costs less pressure but won't move anything.</p>
      </>
    ),
  },
  {
    title: 'Pressure & Expansion',
    icon: '📈',
    accent: '#FFE66D',
    body: (
      <>
        <p>Every action increases the <strong style={{ color: '#FFE66D' }}>pressure meter</strong>. Swaps cost <strong>2</strong> pressure, recolors cost <strong>1</strong>.</p>
        <p className="mt-2">When pressure hits the max, the grid <strong style={{ color: '#FF6B6B' }}>expands</strong> by one row and one column — making it harder to shrink back!</p>
      </>
    ),
  },
  {
    title: 'Matching Mechanics',
    icon: '✨',
    accent: '#A78BFA',
    body: (
      <>
        <p>Align <strong style={{ color: '#A78BFA' }}>3+ cells</strong> of the same color in a row or column to form a match. Confirm it to <strong style={{ color: '#7AFFC4' }}>reduce pressure</strong>.</p>
        <p className="mt-2">If an entire row/column is <strong>uniform</strong> (all one color), confirming it <strong style={{ color: '#7AFFC4' }}>removes</strong> that row/column — shrinking the grid!</p>
      </>
    ),
  },
  {
    title: 'Dead-Zone — Loss',
    icon: '💀',
    accent: '#FF6B6B',
    body: (
      <>
        <p>The <strong style={{ color: '#FF6B6B' }}>red border</strong> around the grid shows the dead-zone limit. If the grid expands to meet it, <strong style={{ color: '#FF6B6B' }}>you lose</strong>.</p>
        <p className="mt-2">Keep pressure low and shrink the grid to stay inside the safe zone.</p>
      </>
    ),
  },
  {
    title: 'Win Condition',
    icon: '🏆',
    accent: '#7AFFC4',
    body: (
      <>
        <p>Remove enough rows and columns to shrink the grid down to <strong style={{ color: '#7AFFC4' }}>1×1</strong> — or eliminate it entirely — and <strong style={{ color: '#7AFFC4' }}>you win!</strong></p>
        <p className="mt-2">Plan your matches carefully. Uniform rows and columns are your best tool for victory.</p>
      </>
    ),
  },
];

export default function HowToPlay() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <div
      className="w-full max-w-lg animate-slide-in-bottom"
      style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          backgroundColor: '#1A1B23',
          border: `1px solid ${slide.accent}33`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderBottom: `1px solid ${slide.accent}22` }}
        >
          <span className="text-2xl">{slide.icon}</span>
          <h3 className="text-base font-bold" style={{ color: slide.accent }}>
            {slide.title}
          </h3>
          <span
            className="ml-auto text-[11px] font-bold tabular-nums"
            style={{ color: '#8892A4' }}
          >
            {index + 1} / {SLIDES.length}
          </span>
        </div>

        {/* Body */}
        <div
          key={index}
          className="px-6 py-5 text-sm leading-relaxed animate-fade-in"
          style={{ color: '#C8CED8', minHeight: 100 }}
        >
          {slide.body}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: '1px solid #22232E' }}>
          <button
            onClick={prev}
            className="cursor-pointer rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#22232E', color: '#8892A4' }}
          >
            ← PREV
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="cursor-pointer rounded-full transition-all duration-200"
                style={{
                  width: i === index ? 20 : 8,
                  height: 8,
                  backgroundColor: i === index ? slide.accent : '#333',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="cursor-pointer rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#22232E', color: '#8892A4' }}
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
