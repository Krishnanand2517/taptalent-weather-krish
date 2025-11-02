import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DailyChartProps {
  dailyTempData: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
}

const DailyChart = ({ dailyTempData }: DailyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={dailyTempData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.1)"
          className="dark:stroke-[rgba(255,255,255,0.1)]"
        />
        <XAxis
          dataKey="date"
          stroke="rgba(0,0,0,0.6)"
          tick={{ fill: "rgba(0,0,0,0.8)" }}
          className="dark:stroke-[rgba(255,255,255,0.6)] dark:**:fill-[rgba(255,255,255,0.8)]"
        />
        <YAxis
          stroke="rgba(0,0,0,0.6)"
          tick={{ fill: "rgba(0,0,0,0.8)" }}
          className="dark:stroke-[rgba(255,255,255,0.6)] dark:**:fill-[rgba(255,255,255,0.8)]"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            color: "#111",
          }}
          labelStyle={{
            color: "#111",
            fontWeight: 600,
          }}
          itemStyle={{
            color: "#111",
          }}
          wrapperStyle={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          cursor={{ stroke: "rgba(0,0,0,0.2)", strokeWidth: 1 }}
        />
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="max"
          stroke="#f97316"
          fill="url(#colorTemp)"
          strokeWidth={2}
          name="Max Temp (°C)"
        />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ fill: "#22c55e", r: 3 }}
          name="Avg Temp (°C)"
        />
        <Line
          type="monotone"
          dataKey="min"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ fill: "#60a5fa", r: 4 }}
          name="Min Temp (°C)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyChart;
