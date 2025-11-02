import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconCloud,
  IconCloudRain,
  IconPin,
  IconTemperature,
  IconTrendingUp,
} from "@tabler/icons-react";

import { useWeatherContext } from "../hooks/useWeatherContext";
import {
  formatDate,
  formatTime,
  getRelativeTime,
} from "../utils/timeFormatting";
import { mockWeatherDataDetailed } from "../data/mockData";
import { getCardBg } from "../utils/colors";
import AlertBox from "../components/AlertBox";
import DetailsGrid from "../components/DetailsGrid";
import SunTimings from "../components/SunTimings";
import HourlyChart from "../components/HourlyChart";
import HourlyScroll from "../components/HourlyScroll";
import RainChart from "../components/RainChart";
import DailyChart from "../components/DailyChart";

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

  const { current, hourly, daily, alerts } = cityDetails;

  const condition = weather[0].main ?? "Unknown";
  const icon = weather[0].icon ?? "";
  const temperature = Math.round(current.temp - 273.15);
  const feelsLike = Math.round(current.feels_like - 273.15);
  const dewPoint = Math.round(current.dew_point - 273.15);
  const lastUpdated = getRelativeTime(dt);
  const isNight = icon.endsWith("n");

  const hourlyChartData =
    hourly?.slice(0, 12).map((h) => ({
      time: formatTime(h.dt),
      temp: Math.round(h.temp - 273.15),
      feelsLike: Math.round(h.feels_like - 273.15),
      pop: Math.round(h.pop * 100),
    })) || [];

  const dailyTempData =
    daily?.map((day) => ({
      date: formatDate(day.dt),
      max: Math.round(day.temp.max - 273.15),
      min: Math.round(day.temp.min - 273.15),
      avg: Math.round((day.temp.max + day.temp.min) / 2 - 273.15),
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
        <AlertBox alerts={alerts} />

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

            <DetailsGrid
              wind_speed={current.wind_speed}
              wind_deg={current.wind_deg}
              humidity={current.humidity}
              visibility={current.visibility}
              pressure={current.pressure}
              dewPoint={dewPoint}
              uvi={current.uvi}
            />
          </div>

          <SunTimings
            sunrise={current.sunrise}
            sunset={current.sunset}
            lastUpdated={lastUpdated}
          />
        </div>

        {/* Chart Cards */}
        <div className="space-y-12">
          {/* Hourly Forecast Chart */}
          <div className="bg-neutral-800/10 dark:bg-white/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconTemperature className="w-6 h-6" />
              12-Hour Forecast
            </h2>
            <div className="h-64">
              <HourlyChart hourlyChartData={hourlyChartData} />
            </div>
            <HourlyScroll hourly={hourly} />
          </div>

          {/* Precipitation Chart */}
          <div className="bg-blue-800/10 dark:bg-blue-200/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconCloudRain className="w-6 h-6" />
              Rain Probability
            </h2>
            <div className="h-48">
              <RainChart hourlyChartData={hourlyChartData} />
            </div>
          </div>

          {/* Daily Temperature Chart */}
          <div className="bg-amber-800/10 dark:bg-amber-200/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <IconTrendingUp className="w-6 h-6" />
              7-Day Temperature Trend
            </h2>
            <div className="h-64">
              <DailyChart dailyTempData={dailyTempData} />
            </div>
          </div>

          <div className="bg-neutral-800/10 dark:bg-white/10 backdrop-blur-xl border border-neutral-300 dark:border-white/20 rounded-3xl p-6 shadow-2xl">
            {/* Wind Chart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
