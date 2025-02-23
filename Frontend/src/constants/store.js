import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import locationReducer from "./locationSlice";
import imageSearchReducer from "./imageSearchSlice";

export default configureStore({
  reducer: {
    restaurants: restaurantReducer,
    locationRestaurants: locationReducer,
    imageSearchRestaurants: imageSearchReducer,
  },
});
