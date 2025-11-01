import { useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconChartArea,
  IconChartDots,
  IconChartLine,
  IconClock,
  IconDroplets,
  IconGauge,
  IconPin,
  IconSunrise,
  IconSunset,
  IconTemperature,
  IconWind,
} from "@tabler/icons-react";

import { useWeatherContext } from "../hooks/useWeatherContext";
import { getRelativeTime } from "../utils/relativeTime";
import WeatherIcon from "../components/WeatherIcon";

const DetailedView = () => {
  const navigate = useNavigate();

  const { currentCity } = useWeatherContext();

  const {
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    sys,
    dt,
  } = currentCity;

  const condition = weather[0].main ?? "Unknown";
  const icon = weather[0].icon ?? "";
  const temperature = Math.round(temp - 273.15);
  const feelsLike = Math.round(feels_like - 273.15);
  const lastUpdated = getRelativeTime(dt);
  const isNight = icon.endsWith("n");

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Detail items for the grid
  const detailItems = [
    {
      label: "Humidity",
      value: `${humidity}%`,
      Icon: IconDroplets,
      iconClass: "text-blue-500",
    },
    {
      label: "Feels Like",
      value: `${feelsLike}°C`,
      Icon: IconTemperature,
      iconClass: "text-orange-500",
    },
    {
      label: "Wind",
      value: `${wind.speed} m/s ${wind.deg ? `• ${wind.deg}°` : ""}`,
      Icon: IconWind,
      iconClass: "text-gray-500",
    },
    {
      label: "Pressure",
      value: `${pressure} hPa`,
      Icon: IconGauge,
      iconClass: "text-indigo-500",
    },
    {
      label: "Sunrise",
      value: sunrise,
      Icon: IconSunrise,
      iconClass: "text-yellow-500",
    },
    {
      label: "Sunset",
      value: sunset,
      Icon: IconSunset,
      iconClass: "text-orange-600",
    },
  ];

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

      <div className="space-y-12 mx-auto max-w-lg text-gray-800 dark:text-gray-100">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <WeatherIcon
                condition={condition}
                isNight={isNight}
                className="w-24 h-24"
              />
              <div>
                <p className="text-7xl font-bold mt-2">{temperature}°C</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 cursor-pointer bg-neutral-700 hover:bg-neutral-900 text-neutral-200 dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-700 rounded-full transition-colors text-sm font-medium">
              <IconPin className="w-4 h-4" />
              <span>Pin to Home</span>
            </button>
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-600 dark:text-gray-300">
            <p className="text-lg">Feels like {feelsLike}°C</p>
            <div className="flex items-center space-x-1 text-sm">
              <IconClock className="inline w-4 h-4" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
            {detailItems.map((item) => (
              <div key={item.label} className="flex items-center space-x-4">
                <item.Icon className={`w-8 h-8 ${item.iconClass}`} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
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
