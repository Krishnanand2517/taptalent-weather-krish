import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconClock, IconSettings } from "@tabler/icons-react";

import { useWeatherContext } from "../hooks/useWeatherContext";
import { getRelativeTime } from "../utils/relativeTime";
import WeatherIcon from "../components/WeatherIcon";
import { getCardBg } from "../utils/colors";

const DetailedView = () => {
  const navigate = useNavigate();

  const { currentCity } = useWeatherContext();

  const {
    name,
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

  return (
    <div
      className={`min-h-screen text-gray-800 rounded-2xl ${
        isNight ? "bg-gray-900 text-gray-100" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center space-x-1 text-sm cursor-pointer transition-colors ${
            isNight
              ? "text-gray-100 hover:text-gray-300"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <IconArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <h1 className="text-xl font-semibold">{name}</h1>

        <IconSettings className="w-5 h-5 cursor-pointer hover:text-gray-400" />
      </header>

      {/* Weather Card */}
      <div
        className={`mx-auto max-w-md rounded-2xl p-6 shadow-lg bg-linear-to-br ${getCardBg(
          condition,
          isNight
        )} ${
          isNight ? "text-gray-100" : "text-gray-800"
        } transition-colors duration-300`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start space-y-2">
            <WeatherIcon
              condition={condition}
              isNight={isNight}
              className="w-16 h-16"
            />
            <p className="text-6xl font-bold">{temperature}°C</p>
            <p className="text-sm opacity-75">Feels like {feelsLike}°C</p>
          </div>
          <div className="text-right text-sm opacity-75">
            <IconClock className="inline w-4 h-4 mr-1" />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
          <div>
            <p className="opacity-70">Humidity</p>
            <p className="font-medium">{humidity}%</p>
          </div>
          <div>
            <p className="opacity-70">Pressure</p>
            <p className="font-medium">{pressure} hPa</p>
          </div>
          <div>
            <p className="opacity-70">Wind</p>
            <p className="font-medium">
              {wind.speed} m/s {wind.deg ? `• ${wind.deg}°` : ""}
            </p>
          </div>
          <div>
            <p className="opacity-70">Sunrise</p>
            <p className="font-medium">{sunrise}</p>
          </div>
          <div>
            <p className="opacity-70">Sunset</p>
            <p className="font-medium">{sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
