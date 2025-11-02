import { IconClock, IconSunrise, IconSunset } from "@tabler/icons-react";

import { formatTime } from "../utils/timeFormatting";

interface SunTimingsProps {
  sunrise: number;
  sunset: number;
  lastUpdated: string;
}

const SunTimings = ({ sunrise, sunset, lastUpdated }: SunTimingsProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-neutral-300 dark:border-white/20">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <IconSunrise className="w-6 h-6 text-yellow-500 dark:text-yellow-300" />
          <div>
            <div className="text-neutral-900 dark:text-blue-200 text-sm">
              Sunrise
            </div>
            <div className="text-neutral-900 dark:text-white font-semibold">
              {formatTime(sunrise)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IconSunset className="w-6 h-6 text-orange-700 dark:text-orange-500" />
          <div>
            <div className="text-neutral-900 dark:text-blue-200 text-sm">
              Sunset
            </div>
            <div className="text-neutral-900 dark:text-white font-semibold">
              {formatTime(sunset)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-1 text-xs text-gray-600 dark:text-gray-400">
        <IconClock className="inline w-4 h-4" />
        <span>Updated {lastUpdated}</span>
      </div>
    </div>
  );
};

export default SunTimings;
