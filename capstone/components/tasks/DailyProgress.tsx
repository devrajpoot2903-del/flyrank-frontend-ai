interface DailyProgressProps {
  completed: number;
  total: number;
  streak: number;
}

export default function DailyProgress({
  completed,
  total,
  streak,
}: DailyProgressProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  // SVG donut ring
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="p-5">
      <h2 className="text-[13px] font-semibold text-stone-700 mb-3">
        Daily Progress
      </h2>

      {/* Circular progress */}
      <div className="flex justify-center mb-3">
        <div className="relative inline-flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
            {/* Track */}
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#f1f5f4"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#4B6B4A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          {/* Centre text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[20px] font-bold text-stone-800">{pct}%</span>
          </div>
        </div>
      </div>

      {/* Sub-label */}
      <p className="text-center text-[12px] text-[#4B6B4A] font-medium mt-0.5">
        {completed} of {total} goal{total !== 1 ? "s" : ""} achieved
      </p>

      {/* Streak */}
      {streak > 0 && (
        <p className="text-center text-[12px] text-stone-400 mt-2">
          🔥 {streak}-day streak
        </p>
      )}
    </div>
  );
}
