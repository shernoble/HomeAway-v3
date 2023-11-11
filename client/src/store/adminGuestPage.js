// reducers.js

import { createSlice } from "@reduxjs/toolkit";
    
    const initialState = {
        data: [],
        isLoading: false,
        error: null,
    };

    const adminHomePageSlice=createSlice({
        name:'adminHomePage',
        initialState,
        reducers:{
            fetchDataRequest(state){
                state.isLoading = true;
            },
            fetchDataSuccess(state, action){
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            },
            fetchDataFailure(state, action){
                state.isLoading = false;
                state.error = action.payload;
            },
        }
    })
    
    export const adminHomePageActions=adminHomePageSlice.actions;
    export default adminHomePageSlice.reducer;