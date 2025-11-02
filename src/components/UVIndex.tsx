import { IconSun } from "@tabler/icons-react";

interface UVIndexProps {
  uvi: number;
}

const UVIndex = ({ uvi }: UVIndexProps) => {
  return (
    <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
      <div className="flex items-center gap-2 mb-2">
        <IconSun className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
        <span className="text-gray-700 dark:text-blue-200 text-sm">
          UV Index
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={
                uvi < 3
                  ? "#10b981"
                  : uvi < 6
                  ? "#fbbf24"
                  : uvi < 8
                  ? "#f97316"
                  : "#ef4444"
              }
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${(uvi / 11) * 175.93} 175.93`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neutral-800 dark:text-white font-bold text-lg">
              {uvi}
            </span>
          </div>
        </div>
        <div>
          <div className="text-neutral-800 dark:text-white text-sm font-medium">
            {uvi < 3
              ? "Low"
              : uvi < 6
              ? "Moderate"
              : uvi < 8
              ? "High"
              : "Very High"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVIndex;
