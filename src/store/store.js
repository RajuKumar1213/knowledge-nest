import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from "./postSlice.js";
import loadingSlice from "./loadingSlice.js";
import alertSlice from "./alertSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    loading: loadingSlice,
    alert: alertSlice,
  },
});

export default store;
