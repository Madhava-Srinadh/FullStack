import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./constant";

// Fetch restaurant details for location search results
const fetchRestaurantDetails = async (restaurantIds) => {
  try {
    const restaurantPromises = restaurantIds.map((id) =>
      fetch(`${BASE_URL}/restaurants/${id}`).then((res) => res.json())
    );
    return await Promise.all(restaurantPromises);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return [];
  }
};

// Fetch restaurants by location
export const fetchRestaurantsByLocation = createAsyncThunk(
  "locationRestaurants/fetchByLocation",
  async ({ lat, lon, radius }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/restaurants/location?lat=${lat}&lon=${lon}&radius=${radius}`
      );
      const data = await response.json();

      if (!data.restaurantIds || data.restaurantIds.length === 0) {
        return [];
      }

      return await fetchRestaurantDetails(data.restaurantIds); // Fetch full details
    } catch (error) {
      throw new Error("Failed to fetch restaurants by location");
    }
  }
);

const locationSlice = createSlice({
  name: "locationRestaurants",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    clearLocationResults: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ Store full restaurant details
      })
      .addCase(fetchRestaurantsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearLocationResults } = locationSlice.actions;
export default locationSlice.reducer;
