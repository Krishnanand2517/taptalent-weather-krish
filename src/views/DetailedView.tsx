import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconChartArea,
  IconChartDots,
  IconChartLine,
  IconClock,
  IconCloud,
  IconDroplets,
  IconEye,
  IconGauge,
  IconPin,
  IconSun,
  IconSunrise,
  IconSunset,
  IconWind,
} from "@tabler/icons-react";

import { useWeatherContext } from "../hooks/useWeatherContext";
import {
  formatDate,
  formatTime,
  getRelativeTime,
} from "../utils/timeFormatting";
import { mockWeatherDataDetailed } from "../data/mockData";
import { getWindDirection } from "../utils/windDirection";
import { getCardBg } from "../utils/colors";

const DetailedView = () => {
  const [isPinned, setIsPinned] = useState(false);
  const navigate = useNavigate();

  const { currentCity } = useWeatherContext();

  const {
    weather,
    dt,
    coord: { lat, lon },
  } = currentCity;

  const cityDetails =
    mockWeatherDataDetailed.find(
      (city) => city.lon === lon && city.lat === lat
    ) ?? mockWeatherDataDetailed[0];

  const { current, hourly, alerts } = cityDetails;

  const condition = weather[0].main ?? "Unknown";
  const icon = weather[0].icon ?? "";
  const temperature = Math.round(current.temp - 273.15);
  const feelsLike = Math.round(current.feels_like - 273.15);
  const dewPoint = Math.round(current.dew_point - 273.15);
  const lastUpdated = getRelativeTime(dt);
  const isNight = icon.endsWith("n");

  const hourlyChartData =
    hourly?.slice(0, 24).map((h) => ({
      time: formatTime(h.dt),
      temp: Math.round(h.temp),
      feelsLike: Math.round(h.feels_like),
      pop: Math.round(h.pop * 100),
    })) || [];

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-1 text-sm cursor-pointer transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span className="font-semibold md:text-lg">Back</span>
        </button>
      </div>

      <div className="space-y-12 text-gray-800 dark:text-gray-100">
        {/* Alerts */}
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

        {/* Current Weather - Hero Card */}
        <div
          className={`${getCardBg(
            condition,
            isNight
          )}/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-8 shadow-2xl`}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <IconCloud className="w-20 h-20 text-neutral-800 dark:text-white" />
                <div>
                  <div className="text-7xl font-bold text-neutral-800 dark:text-white">
                    {temperature}°
                  </div>
                  <p className="text-2xl text-gray-700 dark:text-blue-100 capitalize mt-2">
                    {current.weather[0].description}
                  </p>
                </div>
              </div>
              <div className="text-neutral-900 dark:text-white/80 text-lg">
                Feels like {feelsLike}°
              </div>

              <button
                onClick={() => setIsPinned(!isPinned)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 ${
                  isPinned
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/50"
                    : "bg-neutral-900/20 text-neutral-800 hover:bg-neutral-900/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 backdrop-blur-sm border border-white/30"
                }`}
              >
                <IconPin
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isPinned ? "-rotate-45" : ""
                  }`}
                />
                {isPinned ? "Pinned" : "Pin to Dashboard"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <IconWind className="w-5 h-5 text-gray-600 dark:text-blue-200" />
                  <span className="text-gray-700 dark:text-blue-200 text-sm">
                    Wind
                  </span>
                </div>
                <div className="text-neutral-900 dark:text-white text-2xl font-semibold">
                  {current.wind_speed} m/s
                </div>
                <div className="text-gray-700 dark:text-blue-100 text-sm">
                  {getWindDirection(current.wind_deg)}
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
                  {current.humidity}%
                </div>

                <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                  <div
                    className="bg-blue-400 h-2.5 rounded-full"
                    style={{ width: `${current.humidity}%` }}
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
                  {current.visibility / 1000} km
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
                  {current.pressure}
                </div>
                <div className="text-gray-700 dark:text-blue-100 text-sm">
                  hPa
                </div>
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

              <div className="bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-neutral-300 dark:border-white/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <IconSun className="w-5 h-5 text-yellow-400 dark:text-yellow-300" />
                  <span className="text-gray-700 dark:text-blue-200 text-sm">
                    UV Index
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={
                          current.uvi < 3
                            ? "#10b981"
                            : current.uvi < 6
                            ? "#fbbf24"
                            : current.uvi < 8
                            ? "#f97316"
                            : "#ef4444"
                        }
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${
                          (current.uvi / 11) * 175.93
                        } 175.93`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-800 dark:text-white font-bold text-lg">
                        {current.uvi}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-800 dark:text-white text-sm font-medium">
                      {current.uvi < 3
                        ? "Low"
                        : current.uvi < 6
                        ? "Moderate"
                        : current.uvi < 8
                        ? "High"
                        : "Very High"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sun times */}
          <div className="mt-8 pt-6 border-t border-neutral-300 dark:border-white/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <IconSunrise className="w-6 h-6 text-yellow-500 dark:text-yellow-300" />
                <div>
                  <div className="text-neutral-900 dark:text-blue-200 text-sm">
                    Sunrise
                  </div>
                  <div className="text-neutral-900 dark:text-white font-semibold">
                    {formatTime(current.sunrise)}
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
                    {formatTime(current.sunset)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-1 text-xs text-gray-600 dark:text-gray-400">
              <IconClock className="inline w-4 h-4" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Placeholder Chart Cards */}
        <div className="space-y-12">
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-48">
            <IconChartArea className="w-12 h-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">
              Temperature Chart
            </h3>
            <p className="text-sm text-gray-400">(Placeholder)</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-48">
            <IconChartLine className="w-12 h-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">
              Precipitation Chart
            </h3>
            <p className="text-sm text-gray-400">(Placeholder)</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-48">
            <IconChartDots className="w-12 h-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">Wind Speed</h3>
            <p className="text-sm text-gray-400">(Placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
