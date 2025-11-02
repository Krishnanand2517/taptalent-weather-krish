import { useOutletContext } from "react-router-dom";

import type { CityData, FavoriteCity } from "../types";

type WeatherContextType = {
  currentCity: CityData | null;
  favoriteCities: FavoriteCity[];
};

export const useWeatherContext = () => {
  return useOutletContext<WeatherContextType>();
};
