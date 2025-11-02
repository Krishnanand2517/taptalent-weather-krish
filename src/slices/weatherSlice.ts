import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CityData } from "../types";
import { mockWeatherData } from "../data/mockData";

interface WeatherState {
  currentWeather: CityData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

interface FetchWeatherParams {
  city?: string;
  lat?: number;
  lon?: number;
}

const initialState: WeatherState = {
  currentWeather: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchWeather = createAsyncThunk<
  CityData,
  FetchWeatherParams,
  { rejectValue: string }
>("weather/fetchWeather", async ({ city, lat, lon }, { rejectWithValue }) => {
  try {
    // let url: string;
    // if (city) {
    //   url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`;
    // } else if (lat !== undefined && lon !== undefined) {
    //   url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`;
    // } else {
    //   throw new Error("City name or coordinates required");
    // }

    // const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error("City not found");
    // }

    // const data: CityData = await response.json();
    const data: CityData = mockWeatherData[0];
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An error occurred"
    );
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.currentWeather = null;
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeather.fulfilled,
        (state, action: PayloadAction<CityData>) => {
          state.loading = false;
          state.currentWeather = action.payload;
          state.lastUpdated = new Date().toISOString();
        }
      )
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch weather";
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
