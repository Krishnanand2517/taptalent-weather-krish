import { useEffect, useState } from "react";

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
    if (!favoriteCities.length) return;

    const loadWeatherData = async () => {
      const results: CityData[] = [];

      for (const city of favoriteCities) {
        const cacheKey = `${city.lat},${city.lon}`;
        const cached = getCachedWeather<CityData>(cacheKey);

        if (cached) {
          results.push(cached);
        } else {
          const result = await dispatch(
            fetchWeather({ lat: city.lat, lon: city.lon })
          ).unwrap();

          setCachedWeather(cacheKey, result);

          results.push(result);
        }
      }

      setWeatherData(results);
    };

    loadWeatherData();
  }, [favoriteCities, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weatherData.map((city) => (
        <WeatherCard key={city.id} cityData={city} unit={unit} />
      ))}
    </div>
  );
};

export default DashboardView;
