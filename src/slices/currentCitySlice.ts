import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CityData } from "../types";

interface CurrentCityState {
  city: CityData | null;
}

const initialState: CurrentCityState = {
  city: null,
};

const currentCitySlice = createSlice({
  name: "currentCity",
  initialState,
  reducers: {
    setCurrentCity(state, action: PayloadAction<CityData | null>) {
      state.city = action.payload;
    },
  },
});

export const { setCurrentCity } = currentCitySlice.actions;
export default currentCitySlice.reducer;
