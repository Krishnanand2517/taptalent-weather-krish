import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RainChartProps {
  hourlyChartData: {
    time: string;
    temp: number;
    feelsLike: number;
    pop: number;
  }[];
}

const RainChart = ({ hourlyChartData }: RainChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={hourlyChartData}
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
      >
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
          className="dark:stroke-[rgba(255,255,255,0.1)]"
        />

        {/* X Axis */}
        <XAxis
          dataKey="time"
          stroke="rgba(0,0,0,0.4)"
          className="dark:stroke-[rgba(255,255,255,0.6)]"
          tick={{
            fill: "rgba(0,0,0,0.7)",
            fontSize: 12,
            className: "dark:fill-[rgba(255,255,255,0.8)]",
          }}
          interval={1}
        />

        {/* Y Axis */}
        <YAxis
          stroke="rgba(0,0,0,0.4)"
          className="dark:stroke-[rgba(255,255,255,0.6)]"
          tick={{
            fill: "rgba(0,0,0,0.7)",
            fontSize: 12,
            className: "dark:fill-[rgba(255,255,255,0.8)]",
          }}
          domain={[0, 100]}
        />

        {/* Tooltip */}
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

        {/* Area Fill */}
        <defs>
          <linearGradient id="colorPopLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorPopDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {/* Area Line */}
        <Area
          type="monotone"
          dataKey="pop"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorPopLight)"
          className="dark:stroke-[#60a5fa] dark:fill-[url(#colorPopDark)]"
          name="Precipitation (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RainChart;
