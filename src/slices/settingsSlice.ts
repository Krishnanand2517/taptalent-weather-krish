import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TemperatureUnit } from "../types";

interface SettingsState {
  temperatureUnit: TemperatureUnit;
}

const initialState: SettingsState = {
  temperatureUnit: "celsius",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit =
        state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius";
    },
  },
});

export const { setTemperatureUnit, toggleTemperatureUnit } =
  settingsSlice.actions;
export default settingsSlice.reducer;
