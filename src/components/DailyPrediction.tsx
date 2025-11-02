import { IconDroplets } from "@tabler/icons-react";
import type { DailyData } from "../types";
import type { TemperatureUnit } from "../types";
import { formatDate } from "../utils/timeFormatting";
import { getTemperatureDisplay } from "../utils/tempConversion";
import WeatherIcon from "./WeatherIcon";

interface DailyPredictionProps {
  day: DailyData;
  idx: number;
  unit: TemperatureUnit;
}

const DailyPrediction = ({ day, idx, unit }: DailyPredictionProps) => {
  const conditionToday = day.weather[0].main;
  const isNightToday = day.weather[0].icon.endsWith("n");

  // Convert temperatures based on unit
  const maxTemp = getTemperatureDisplay(day.temp.max, unit);
  const minTemp = getTemperatureDisplay(day.temp.min, unit);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-center space-x-4 space-y-2">
      <div className="text-neutral-900 dark:text-white font-semibold">
        {idx === 0 ? "Today" : formatDate(day.dt)}
      </div>

      <div className="flex items-center gap-2">
        <WeatherIcon
          condition={conditionToday}
          isNight={isNightToday}
          className="w-6 h-6 text-blue-600 dark:text-blue-200"
        />
        <span className="capitalize text-sm text-neutral-700 dark:text-neutral-200">
          {day.weather[0].description}
        </span>
      </div>

      <div className="text-right">
        <span className="text-lg font-bold text-neutral-900 dark:text-white">
          {maxTemp.value}°
        </span>
        <span className="ml-2 text-blue-700 dark:text-blue-200">
          {minTemp.value}°
        </span>
      </div>

      <div className="flex items-center gap-2 justify-end text-blue-700 dark:text-blue-200">
        <IconDroplets className="w-4 h-4" />
        <span className="text-sm">{Math.round(day.pop * 100)}%</span>
      </div>
    </div>
  );
};

export default DailyPrediction;
