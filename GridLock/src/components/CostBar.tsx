
interface CostBarProps {
  cost: number;
  threshold: number;
  orientation?: 'vertical' | 'horizontal';
}

export default function CostBar({ cost, threshold, orientation = 'vertical' }: CostBarProps) {
  const pct = Math.min((cost / threshold) * 100, 100);
  const isHorizontal = orientation === 'horizontal';

  const fillColor =
    pct < 50 ? '#7AFFC4' : pct < 80 ? '#FFE66D' : '#FF6B6B';

  return (
    <div
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center gap-4 animate-fade-in`}
    >
      <div
        className="text-[10px] font-bold tracking-widest opacity-50"
        style={{ color: '#8892A4' }}
      >
        PRESSURE
      </div>

      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          width: isHorizontal ? 200 : 32,
          height: isHorizontal ? 32 : 300,
          backgroundColor: '#1A1B23',
          border: '1px solid #22232E',
        }}
      >
        <div
          className="absolute bottom-0 left-0 rounded-sm transition-all duration-[100ms] ease-out"
          style={{
            height: isHorizontal ? '100%' : `${pct}%`,
            width: isHorizontal ? `${pct}%` : '100%',
            backgroundColor: fillColor,
            boxShadow: `0 0 12px ${fillColor}66`,
          }}
        />
      </div>

      <div
        className="text-xs font-black tabular-nums"
        style={{ color: fillColor }}
      >
        {cost}/{threshold}
      </div>
    </div>
  );
}
