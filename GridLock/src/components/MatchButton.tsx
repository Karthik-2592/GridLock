
interface MatchButtonProps {
  onClick: () => void;
}

export default function MatchButton({ onClick }: MatchButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border-none transition-transform hover:scale-[1.4] active:scale-90 animate-fade-in"
      style={{
        width: 20,
        height: 20,
        top: -6,
        right: -6,
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F1117"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  );
}
