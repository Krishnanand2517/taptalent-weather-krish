import { useEffect, useState } from "react";
import { IconLoader2, IconMapPin } from "@tabler/icons-react";

import WeatherCard from "../components/WeatherCard";
import { useWeatherContext } from "../hooks/useWeatherContext";
import { getCachedWeather, setCachedWeather } from "../utils/weatherCache";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchWeather } from "../slices/weatherSlice";
import type { CityData } from "../types";
import { selectTemperatureUnit } from "../selectors";

const DashboardView = () => {
  const { favoriteCities } = useWeatherContext();
  const dispatch = useAppDispatch();
  const unit = useAppSelector(selectTemperatureUnit);

  const [weatherData, setWeatherData] = useState<CityData[]>([]);

  useEffect(() => {
    if (!favoriteCities.length) {
      setWeatherData([]);
      return;
    }

    const loadWeatherData = async () => {
      const results: CityData[] = [];

      for (const city of favoriteCities) {
        const cacheKey = `${city.lat},${city.lon}`;
        const cached = getCachedWeather<CityData>(cacheKey);

        if (cached) {
          results.push(cached);
        } else {
          try {
            const result = await dispatch(
              fetchWeather({ lat: city.lat, lon: city.lon })
            ).unwrap();

            setCachedWeather(cacheKey, result);
            results.push(result);
          } catch (error) {
            console.error(
              "Failed to fetch weather for city:",
              city.name,
              error
            );
          }
        }
      }

      setWeatherData(results);
    };

    loadWeatherData();
  }, [favoriteCities, dispatch]);

  if (favoriteCities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center p-8 bg-gray-800/50 rounded-lg shadow-lg">
        <IconMapPin className="w-16 h-16 text-blue-300 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-3">
          Your Dashboard is Empty
        </h2>
        <p className="text-xl text-gray-300 max-w-md">
          Start by searching for a city and clicking the pin icon to add it to
          your dashboard.
        </p>
      </div>
    );
  }

  if (weatherData.length !== favoriteCities.length) {
    return (
      <div className="flex items-center justify-center h-80 gap-2">
        <IconLoader2 className="h-8 w-8 text-neutral-800 animate-spin" />
        <p className="text-neutral-800 text-lg animate-pulse">
          Loading Favorite Cities...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weatherData.map((city) => (
        <WeatherCard key={city.id} cityData={city} unit={unit} />
      ))}
    </div>
  );
};

export default DashboardView;
