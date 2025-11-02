import type { WeatherAlert } from "../types";
import { IconAlertTriangle } from "@tabler/icons-react";
import { formatDate, formatTime } from "../utils/timeFormatting";

interface AlertBoxProps {
  alerts: WeatherAlert[] | undefined;
}

const AlertBox = ({ alerts }: AlertBoxProps) => {
  return (
    <>
      {alerts && alerts.length > 0 && (
        <div className="bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <IconAlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-neutral-700 dark:text-white font-semibold text-lg mb-1">
                {alerts[0].event}
              </h3>
              <p className="text-red-950 dark:text-red-100 text-sm">
                {alerts[0].description}
              </p>
              <p className="text-red-950 dark:text-red-200 text-xs mt-2">
                Valid until {formatDate(alerts[0].end)} at{" "}
                {formatTime(alerts[0].end)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBox;
