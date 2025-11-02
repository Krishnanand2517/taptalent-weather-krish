import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TemperatureUnit } from "../types";

interface HourlyChartProps {
  hourlyChartData: {
    time: string;
    temp: number;
    feelsLike: number;
    pop: number;
  }[];
  unit: TemperatureUnit;
}

const HourlyChart = ({ hourlyChartData, unit }: HourlyChartProps) => {
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={hourlyChartData}
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
          className="dark:stroke-[rgba(255,255,255,0.1)]"
        />

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

        <YAxis
          stroke="rgba(0,0,0,0.4)"
          className="dark:stroke-[rgba(255,255,255,0.6)]"
          tick={{
            fill: "rgba(0,0,0,0.7)",
            fontSize: 12,
            className: "dark:fill-[rgba(255,255,255,0.8)]",
          }}
          label={{
            value: unitSymbol,
            angle: -90,
            position: "insideLeft",
            style: {
              fill: "rgba(0,0,0,0.7)",
              fontSize: 12,
            },
            className: "dark:fill-[rgba(255,255,255,0.8)]",
          }}
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
          formatter={(value: number) => [`${value}${unitSymbol}`, ""]}
        />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ fill: "#f59e0b", r: 4 }}
          name={`Temperature (${unitSymbol})`}
        />
        <Line
          type="monotone"
          dataKey="feelsLike"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name={`Feels Like (${unitSymbol})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HourlyChart;
