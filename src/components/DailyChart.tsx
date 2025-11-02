/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { TemperatureUnit } from "../types";

interface DailyChartProps {
  dailyTempData: {
    date: string;
    max: number;
    min: number;
    avg: number;
  }[];
  unit: TemperatureUnit;
}

const DailyChart = ({ dailyTempData, unit }: DailyChartProps) => {
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  // Custom tooltip to format temperatures
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ color: "#111", fontWeight: 600, marginBottom: "8px" }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{
                color: entry.color,
                margin: "4px 0",
                fontSize: "14px",
              }}
            >
              {entry.name}: {entry.value}
              {unitSymbol}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          label={{
            value: unitSymbol,
            angle: -90,
            position: "insideLeft",
            style: { fill: "rgba(0,0,0,0.8)" },
            className: "dark:fill-[rgba(255,255,255,0.8)]",
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
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
          name={`Max Temp`}
        />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ fill: "#22c55e", r: 3 }}
          name={`Avg Temp`}
        />
        <Line
          type="monotone"
          dataKey="min"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ fill: "#60a5fa", r: 4 }}
          name={`Min Temp`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyChart;
