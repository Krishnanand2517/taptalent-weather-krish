import { useOutletContext } from "react-router-dom";

import type { CityData } from "../types";

type WeatherContextType = {
  weatherData: CityData[];
};

export const useWeatherContext = () => {
  return useOutletContext<WeatherContextType>();
};
