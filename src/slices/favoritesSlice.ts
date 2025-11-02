import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteCity } from "../types";

interface FavoritesState {
  cities: FavoriteCity[];
}

const initialState: FavoritesState = {
  cities: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteCity>) => {
      const exists = state.cities.find((city) => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.cities = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
