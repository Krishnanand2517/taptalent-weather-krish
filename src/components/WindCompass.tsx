import { getWindDirection } from "../utils/windDirection";

interface WindCompassProps {
  wind_deg: number;
  wind_speed: number;
  wind_gust?: number;
}

const WindCompass = ({ wind_deg, wind_speed, wind_gust }: WindCompassProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 transition-colors duration-300">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="rgba(0,0,0,0.02)"
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="2"
            className="dark:fill-[rgba(255,255,255,0.05)] dark:stroke-[rgba(255,255,255,0.3)]"
          />

          {/* Inner circles */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1"
            strokeDasharray="2,2"
            className="dark:stroke-[rgba(255,255,255,0.2)]"
          />
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1"
            strokeDasharray="2,2"
            className="dark:stroke-[rgba(255,255,255,0.2)]"
          />

          {/* Directions */}
          {[
            { x: 100, y: 20, label: "N" },
            { x: 180, y: 105, label: "E" },
            { x: 100, y: 190, label: "S" },
            { x: 20, y: 105, label: "W" },
          ].map((d, i) => (
            <text
              key={i}
              x={d.x}
              y={d.y}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              className="fill-neutral-800 dark:fill-white"
            >
              {d.label}
            </text>
          ))}

          {[
            { x: 145, y: 40, label: "NE" },
            { x: 160, y: 155, label: "SE" },
            { x: 55, y: 160, label: "SW" },
            { x: 40, y: 45, label: "NW" },
          ].map((d, i) => (
            <text
              key={i}
              x={d.x}
              y={d.y}
              textAnchor="middle"
              fontSize="12"
              className="fill-neutral-600 dark:fill-[rgba(255,255,255,0.7)]"
            >
              {d.label}
            </text>
          ))}

          {/* Arrow */}
          <g transform={`rotate(${wind_deg} 100 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="#06b6d4"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polygon points="100,20 95,35 100,30 105,35" fill="#06b6d4" />
            <circle cx="100" cy="100" r="8" fill="#06b6d4" />
          </g>
        </svg>
      </div>

      <div className="mt-4 text-center">
        <div className="text-neutral-900 dark:text-white text-3xl font-bold transition-colors">
          {wind_speed} m/s
        </div>
        <div className="text-blue-800 dark:text-blue-200 text-lg transition-colors">
          {getWindDirection(wind_deg)} ({wind_deg}°)
        </div>
        {wind_gust && (
          <div className="text-blue-700 dark:text-blue-300 text-sm mt-1 transition-colors">
            Gusts: {wind_gust} m/s
          </div>
        )}
      </div>
    </div>
  );
};

export default WindCompass;
