import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WindChartProps {
  windData: {
    time: string;
    speed: number;
    direction: string;
    deg: number;
  }[];
}

const WindChart = ({ windData }: WindChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={windData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.1)"
          className="dark:stroke-[rgba(255,255,255,0.1)]"
        />
        <XAxis
          dataKey="time"
          stroke="rgba(0,0,0,0.6)"
          tick={{ fill: "rgba(0,0,0,0.8)", fontSize: 12 }}
          className="dark:stroke-[rgba(255,255,255,0.6)] dark:**:fill-[rgba(255,255,255,0.8)]"
          interval={2}
        />
        <YAxis
          stroke="rgba(0,0,0,0.6)"
          tick={{ fill: "rgba(0,0,0,0.8)", fontSize: 12 }}
          label={{
            value: "m/s",
            angle: -90,
            position: "insideLeft",
            fill: "rgba(0,0,0,0.8)",
          }}
          className="dark:stroke-[rgba(255,255,255,0.6)] 
    dark:[&_.recharts-cartesian-axis-tick-value]:fill-[rgba(255,255,255,0.8)]
    dark:[&_.recharts-label]:fill-[rgba(255,255,255,0.8)]
  "
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-black/90 border border-white/20 rounded-lg p-3">
                  <p className="text-white font-semibold">
                    {payload[0].payload.time}
                  </p>
                  <p className="text-cyan-300">
                    Speed: {payload[0].value.toFixed(1)} m/s
                  </p>
                  <p className="text-blue-300">
                    Direction: {payload[0].payload.direction} (
                    {payload[0].payload.deg}°)
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <defs>
          <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="speed"
          stroke="#06b6d4"
          fill="url(#colorWind)"
          strokeWidth={3}
          name="Wind Speed (m/s)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WindChart;
