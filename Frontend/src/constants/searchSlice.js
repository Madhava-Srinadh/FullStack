import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearching: false,
  },
  reducers: {
    setSearching: (state, action) => {
      state.isSearching = action.payload; // Set isSearching to true or false
    },
  },
});

export const { setSearching } = searchSlice.actions;
export default searchSlice.reducer;
