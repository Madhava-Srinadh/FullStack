import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constant";

export const fetchRestaurantsByImage = createAsyncThunk(
  "imageSearchRestaurants/fetchByImage",
  async (formData) => {
    const response = await fetch(`${BASE_URL}/api/image-search`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    const restaurantPromises = data.restaurantIds.map((id) =>
      fetch(`${BASE_URL}/restaurants/${id}`).then((res) => res.json())
    );
    const fullRestaurants = await Promise.all(restaurantPromises);

    return { detectedFood: data.detectedCuisine, restaurants: fullRestaurants };
  }
);

const imageSearchSlice = createSlice({
  name: "imageSearchRestaurants",
  initialState: { list: [], detectedFood: "", loading: false, error: null },
  reducers: {
    clearImageResults: (state) => {
      state.list = [];
      state.detectedFood = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantsByImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurantsByImage.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.restaurants;
        state.detectedFood = action.payload.detectedFood;
      })
      .addCase(fetchRestaurantsByImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearImageResults } = imageSearchSlice.actions;
export default imageSearchSlice.reducer;
