import { useNavigate } from "react-router-dom";
import { IconDroplets, IconClock } from "@tabler/icons-react";

import type { CityData } from "../types";
import WeatherIcon from "./WeatherIcon";
import { getCardBg } from "../utils/colors";
import { getRelativeTime } from "../utils/timeFormatting";

interface WeatherCardProps {
  cityData: CityData;
}

const WeatherCard = ({ cityData }: WeatherCardProps) => {
  const {
    id,
    name,
    main: { temp, humidity },
    weather,
    dt,
  } = cityData;

  const condition = weather[0].main ?? "Unknown";
  const icon = weather[0].icon ?? "";
  const temperature = Math.round(temp - 273.15);
  const lastUpdated = getRelativeTime(dt);
  const isNight = icon.endsWith("n");

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/city-${id}`)}
      className={`bg-linear-to-br ${getCardBg(condition, isNight)}
                 p-6 md:px-12 rounded-2xl shadow-lg 
                 transition-all duration-300 ease-in-out cursor-pointer
                 hover:shadow-xl hover:-translate-y-1
                 ${isNight ? "text-gray-100" : "text-gray-800"}`}
    >
      <div className="flex justify-between space-x-4">
        {/* Left Column: Icon, City, Time */}
        <div className="flex flex-col justify-between">
          <div>
            <WeatherIcon
              condition={condition}
              isNight={isNight}
              className="w-16 h-16"
            />
            <h2
              className={`text-2xl font-bold mt-2 ${
                isNight ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {name}
            </h2>
          </div>

          <div className="mt-4">
            <div
              className={`flex items-center space-x-1 ${
                isNight ? "text-gray-300" : "text-gray-500"
              }`}
            >
              <IconClock className="w-4 h-4" />
              <span className="text-sm">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Temp & Humidity */}
        <div className="flex flex-col items-end justify-between text-right">
          <div>
            <h1
              className={`text-6xl font-bold relative ${
                isNight ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {temperature}
              <span
                className={`text-2xl absolute -top-1 -right-6 font-light ${
                  isNight ? "text-gray-300" : "text-gray-500"
                }`}
              >
                °C
              </span>
            </h1>
          </div>

          <div
            className={`flex items-center space-x-1 mt-4 ${
              isNight ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <IconDroplets
              className={`w-6 h-6 ${
                isNight ? "text-blue-300" : "text-blue-400"
              }`}
            />
            <div>
              <p
                className={`text-sm ${
                  isNight ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Humidity
              </p>
              <p
                className={`text-lg font-semibold ${
                  isNight ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
