import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./constant";

// 📌 Fetch normal restaurants (pagination support)
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (page) => {
    const response = await fetch(
      `${BASE_URL}/restaurants?page=${page}&per_page=10`
    );
    const data = await response.json();
    return data.restaurants || [];
  }
);

// 📌 Fetch more restaurants (pagination)
export const fetchMoreRestaurants = createAsyncThunk(
  "restaurants/fetchMoreRestaurants",
  async (page) => {
    const response = await fetch(
      `${BASE_URL}/restaurants?page=${page}&per_page=10`
    );
    const data = await response.json();
    return data.restaurants || [];
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: { list: [], page: 1, loading: false, error: null },
  reducers: {
    resetRestaurants: (state) => {
      state.list = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ Replace with new restaurants
        state.page = 1; // ✅ Reset pagination
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoreRestaurants.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload]; // ✅ Append new restaurants
        state.page += 1;
      });
  },
});

export const { resetRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
