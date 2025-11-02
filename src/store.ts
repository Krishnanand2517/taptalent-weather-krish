import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import detailedWeatherReducer from "./slices/detailedWeatherSlice";
import favoritesReducer from "./slices/favoritesSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    detailedWeather: detailedWeatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
