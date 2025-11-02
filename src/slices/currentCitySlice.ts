import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CityData } from "../types";

interface CurrentCityState {
  city: CityData | null;
}

const persistedCity = localStorage.getItem("currentCity");

const initialState: CurrentCityState = {
  city: persistedCity ? JSON.parse(persistedCity) : null,
};

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    setCurrentCity(state, action: PayloadAction<CityData | null>) {
      state.city = action.payload;
      if (action.payload) {
        localStorage.setItem("currentCity", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("currentCity");
      }
    },
  },
});

export const { setCurrentCity } = currentCitySlice.actions;
export default currentCitySlice.reducer;
