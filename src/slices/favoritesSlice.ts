import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CityData, FavoriteCity } from "../types";
import { mockWeatherData } from "../data/mockData";

const firstCityData: CityData = mockWeatherData[0];

const initialFavorite: FavoriteCity = {
  id: firstCityData.id,
  name: firstCityData.name,
  country: firstCityData.sys.country,
  lat: firstCityData.coord.lat,
  lon: firstCityData.coord.lon,
};

interface FavoritesState {
  cities: FavoriteCity[];
  loading: boolean;
  error: string | null;
  synced: boolean;
}

const favoritesAPI = {
  async fetchAll(): Promise<FavoriteCity[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      const stored = localStorage.getItem("favoriteCities");
      // return stored ? JSON.parse(stored) : [];
      return [initialFavorite];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  },

  async addCity(city: FavoriteCity): Promise<FavoriteCity> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));
    const favorites = await this.fetchAll();
    const updated = [...favorites, city];
    localStorage.setItem("favoriteCities", JSON.stringify(updated));
    return city;
  },

  async removeCity(cityId: number): Promise<number> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));
    const favorites = await this.fetchAll();
    const updated = favorites.filter((city) => city.id !== cityId);
    localStorage.setItem("favoriteCities", JSON.stringify(updated));
    return cityId;
  },

  async clearAll(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 100));
    localStorage.removeItem("favoriteCities");
  },
};

export const fetchFavorites = createAsyncThunk<
  FavoriteCity[],
  void,
  { rejectValue: string }
>("favorites/fetchFavorites", async (_, { rejectWithValue }) => {
  try {
    return await favoritesAPI.fetchAll();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch favorites"
    );
  }
});

export const addFavoriteAsync = createAsyncThunk<
  FavoriteCity,
  FavoriteCity,
  { rejectValue: string }
>("favorites/addFavorite", async (city, { rejectWithValue }) => {
  try {
    return await favoritesAPI.addCity(city);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to add favorite"
    );
  }
});

export const removeFavoriteAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("favorites/removeFavorite", async (cityId, { rejectWithValue }) => {
  try {
    return await favoritesAPI.removeCity(cityId);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to remove favorite"
    );
  }
});

export const clearFavoritesAsync = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("favorites/clearFavorites", async (_, { rejectWithValue }) => {
  try {
    await favoritesAPI.clearAll();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to clear favorites"
    );
  }
});

const initialState: FavoritesState = {
  cities: [],
  loading: false,
  error: null,
  synced: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Optimistic update reducers (optional, for immediate UI feedback)
    addFavoriteOptimistic: (state, action: PayloadAction<FavoriteCity>) => {
      const exists = state.cities.find((city) => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
      }
    },
    removeFavoriteOptimistic: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
        state.synced = true;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch favorites";
      })
      // Add favorite
      .addCase(addFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.cities.find(
          (city) => city.id === action.payload.id
        );
        if (!exists) {
          state.cities.push(action.payload);
        }
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add favorite";
      })
      // Remove favorite
      .addCase(removeFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(
          (city) => city.id !== action.payload
        );
      })
      .addCase(removeFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to remove favorite";
      })
      // Clear favorites
      .addCase(clearFavoritesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearFavoritesAsync.fulfilled, (state) => {
        state.loading = false;
        state.cities = [];
      })
      .addCase(clearFavoritesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to clear favorites";
      });
  },
});

export const { addFavoriteOptimistic, removeFavoriteOptimistic } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
