import { IconDroplet } from "@tabler/icons-react";

import WeatherIcon from "./WeatherIcon";
import { formatTime } from "../utils/timeFormatting";
import type { HourlyData } from "../types";

interface HourlyScrollProps {
  hourly: HourlyData[] | undefined;
}

const HourlyScroll = ({ hourly }: HourlyScrollProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 mt-2 pb-2 -mb-2">
      {hourly?.slice(0, 12).map((hour, index) => {
        const condition = hour.weather[0].main;
        const isNightHourly = hour.weather[0].icon.endsWith("n");
        const hourlyTemp = Math.round(hour.temp - 273.15);

        return (
          <div
            key={index}
            className="flex flex-col items-center shrink-0 w-24 p-3 bg-gray-100 dark:bg-gray-800/80 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600/80 transition-colors"
          >
            <p className="text-sm font-medium">{formatTime(hour.dt)}</p>
            <WeatherIcon
              condition={condition}
              isNight={isNightHourly}
              className="w-10 h-10 my-1"
            />
            <p className="text-lg font-bold">{hourlyTemp}°</p>
            <div className="flex items-center text-xs text-blue-500 dark:text-blue-400 mt-1">
              <IconDroplet size={12} className="mr-1" />
              <span>{Math.round(hour.pop * 100)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyScroll;
