import { IconDroplets, IconLeaf, IconClock } from "@tabler/icons-react";

import type { CityData } from "../types";
import WeatherIcon from "./WeatherIcon";
import { getAqiColor, getCardBg } from "../utils/colors";
import { useNavigate } from "react-router-dom";

interface WeatherCardProps {
  cityData: CityData;
}

const WeatherCard = ({ cityData }: WeatherCardProps) => {
  const { id, city, temperature, condition, humidity, aqi, lastUpdated } =
    cityData;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/city-${id}`)}
      className={`bg-linear-to-br ${getCardBg(condition)}
                 p-6 md:px-12 rounded-2xl shadow-lg 
                 transition-all duration-300 ease-in-out
                 hover:cursor-pointer hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex justify-between space-x-4">
        {/* Left Column: Icon, City, AQI, Status */}
        <div className="flex flex-col justify-between">
          <div>
            <WeatherIcon condition={condition} className="w-16 h-16" />
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{city}</h2>
            <div
              className={`flex items-center space-x-1 ${getAqiColor(aqi)} mt-1`}
            >
              <IconLeaf className="w-4 h-4" />
              <span className="text-sm font-medium">AQI {aqi}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <IconClock className="w-4 h-4" />
              <span className="text-sm">{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Temp, Humidity */}
        <div className="flex flex-col items-end justify-between text-right">
          <div>
            <h1 className="text-6xl font-bold text-gray-900 relative">
              {temperature}
              <span className="text-2xl absolute -top-1 -right-6 font-light text-gray-500">
                °C
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 mt-4">
            <IconDroplets className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-lg font-semibold text-gray-800">{humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
