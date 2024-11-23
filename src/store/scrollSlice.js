import { createSlice } from "@reduxjs/toolkit";

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: { scrollToTop: false },
  reducers: {
    triggerScrollToTop(state) {
      state.scrollToTop = true;
    },
    resetScrollToTop(state) {
      state.scrollToTop = false;
    },
  },
});

export const { triggerScrollToTop, resetScrollToTop } = scrollSlice.actions;
export default scrollSlice.reducer;
