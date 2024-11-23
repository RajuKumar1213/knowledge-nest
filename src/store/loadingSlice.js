import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name : "loading",
    initialState : {loading : true},
    reducers : {
        setLoadingTrue: (state) =>{
            state.loading = true;
        },
        setLoadingFalse: (state) =>{
            state.loading = false;
        }
    }
})

export const {setLoadingTrue, setLoadingFalse} = loadingSlice.actions;
export default loadingSlice.reducer;