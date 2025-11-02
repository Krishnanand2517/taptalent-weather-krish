import type { RootState } from "./store";

export const selectCurrentWeather = (state: RootState) =>
  state.weather.currentWeather;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;
export const selectWeatherLastUpdated = (state: RootState) =>
  state.weather.lastUpdated;

export const selectDetailedWeather = (state: RootState) =>
  state.detailedWeather.data;
export const selectDetailedWeatherLoading = (state: RootState) =>
  state.detailedWeather.loading;
export const selectDetailedWeatherError = (state: RootState) =>
  state.detailedWeather.error;
export const selectDetailedWeatherLastUpdated = (state: RootState) =>
  state.detailedWeather.lastUpdated;

export const selectFavoriteCities = (state: RootState) =>
  state.favorites.cities;

export const selectTemperatureUnit = (state: RootState) =>
  state.settings.temperatureUnit;

export const selectIsFavorite = (cityId: number) => (state: RootState) => {
  return state.favorites.cities.some((city) => city.id === cityId);
};
