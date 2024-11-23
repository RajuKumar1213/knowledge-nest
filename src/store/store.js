import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from "./postSlice.js";
import loadingSlice from "./loadingSlice.js";

const store = configureStore({
    reducer : {
        auth : authSlice,
        post : postSlice,
        loading : loadingSlice
    }
})

export default store;

