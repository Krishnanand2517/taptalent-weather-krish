import {
  IconDroplets,
  IconEye,
  IconGauge,
  IconWind,
} from "@tabler/icons-react";

import UVIndex from "./UVIndex";
import { getWindDirection } from "../utils/windDirection";

interface DetailsGridProps {
  wind_speed: number;
  wind_deg: number;
  humidity: number;
  visibility: number;
  pressure: number;
  dewPoint: number;
  uvi: number;
}

const DetailsGrid = ({
  wind_speed,
  wind_deg,
  humidity,
  visibility,
  pressure,
  dewPoint,
  uvi,
}: DetailsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <IconWind className="w-5 h-5 text-gray-600 dark:text-blue-200" />
          <span className="text-gray-700 dark:text-blue-200 text-sm">Wind</span>
        </div>
        <div className="text-neutral-900 dark:text-white text-2xl font-semibold">
          {wind_speed} m/s
        </div>
        <div className="text-gray-700 dark:text-blue-100 text-sm">
          {getWindDirection(wind_deg)}
        </div>
      </div>

      <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <IconDroplets className="w-5 h-5 text-gray-600 dark:text-blue-200" />
          <span className="text-gray-700 dark:text-blue-200 text-sm">
            Humidity
          </span>
        </div>
        <div className="text-neutral-900 dark:text-white text-2xl font-semibold">
          {humidity}%
        </div>

        <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 mt-4">
          <div
            className="bg-blue-400 h-2.5 rounded-full"
            style={{ width: `${humidity}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <IconEye className="w-5 h-5 text-gray-600 dark:text-blue-200" />
          <span className="text-gray-700 dark:text-blue-200 text-sm">
            Visibility
          </span>
        </div>
        <div className="text-neutral-900 dark:text-white text-2xl font-semibold">
          {visibility / 1000} km
        </div>
      </div>

      <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <IconGauge className="w-5 h-5 text-gray-600 dark:text-blue-200" />
          <span className="text-gray-700 dark:text-blue-200 text-sm">
            Pressure
          </span>
        </div>
        <div className="text-neutral-900 dark:text-white text-2xl font-semibold">
          {pressure}
        </div>
        <div className="text-gray-700 dark:text-blue-100 text-sm">hPa</div>
      </div>

      <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
        <div className="flex items-center gap-2 mb-2">
          <IconDroplets className="w-5 h-5 text-gray-600 dark:text-blue-200" />
          <span className="text-gray-700 dark:text-blue-200 text-sm">
            Dew Point
          </span>
        </div>
        <div className="text-neutral-800 dark:text-white text-2xl font-semibold">
          {dewPoint}°
        </div>
      </div>

      <UVIndex uvi={uvi} />
    </div>
  );
};

export default DetailsGrid;
