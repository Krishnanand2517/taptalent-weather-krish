import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WeatherData } from "../types";

const API_KEY = import.meta.env.VITE_OWM_KEY;

interface DetailedWeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

interface FetchDetailedWeatherParams {
  lat: number;
  lon: number;
}

const initialState: DetailedWeatherState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchDetailedWeather = createAsyncThunk<
  WeatherData,
  FetchDetailedWeatherParams,
  { rejectValue: string }
>(
  "detailedWeather/fetchDetailedWeather",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch detailed weather data");
      }

      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const detailedWeatherSlice = createSlice({
  name: "detailedWeather",
  initialState,
  reducers: {
    clearDetailedWeather: (state) => {
      state.data = null;
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailedWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDetailedWeather.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.data = action.payload;
          state.lastUpdated = new Date().toISOString();
        }
      )
      .addCase(fetchDetailedWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch detailed weather";
      });
  },
});

export const { clearDetailedWeather } = detailedWeatherSlice.actions;
export default detailedWeatherSlice.reducer;
