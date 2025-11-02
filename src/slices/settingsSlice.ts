import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TemperatureUnit } from "../types";

interface SettingsState {
  temperatureUnit: TemperatureUnit;
}

const loadTemperatureUnitFromStorage = (): TemperatureUnit => {
  try {
    const stored = localStorage.getItem("temperatureUnit");
    if (stored === "celsius" || stored === "fahrenheit") {
      return stored;
    }
  } catch (error) {
    console.error("Failed to load temperature unit from localStorage:", error);
  }
  return "celsius";
};

const saveTemperatureUnitToStorage = (unit: TemperatureUnit) => {
  try {
    localStorage.setItem("temperatureUnit", unit);
  } catch (error) {
    console.error("Failed to save temperature unit to localStorage:", error);
  }
};

const initialState: SettingsState = {
  temperatureUnit: loadTemperatureUnitFromStorage(),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
      saveTemperatureUnitToStorage(action.payload);
    },
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit =
        state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius";
      saveTemperatureUnitToStorage(state.temperatureUnit);
    },
  },
});

export const { setTemperatureUnit, toggleTemperatureUnit } =
  settingsSlice.actions;
export default settingsSlice.reducer;
