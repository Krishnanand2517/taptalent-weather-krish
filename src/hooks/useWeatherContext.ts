import { useOutletContext } from "react-router-dom";

import type { CityData } from "../types";

type WeatherContextType = {
  weatherData: CityData[];
  currentCity: CityData;
};

export const useWeatherContext = () => {
  return useOutletContext<WeatherContextType>();
};
