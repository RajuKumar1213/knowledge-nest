import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  message: "",
  type: "info", // info, success, error, warning
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = "";
      state.type = "info";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
