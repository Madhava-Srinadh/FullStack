import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import locationReducer from "./locationSlice";
import imageSearchReducer from "./imageSearchSlice";
import searchReducer from "./searchSlice"; // Import the new slice

export default configureStore({
  reducer: {
    restaurants: restaurantReducer,
    locationRestaurants: locationReducer,
    imageSearchRestaurants: imageSearchReducer,
    search: searchReducer, // Add the search reducer
  },
});
