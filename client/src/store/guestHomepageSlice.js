import { createSlice } from "@reduxjs/toolkit";

const initialState={

};

const guestHomepageSlice=createSlice({
    name:'guestHomepage',
    initialState,
    reducers:{

    }
}) ;

export const guestHomepageActions=guestHomepageSlice.actions;
export default guestHomepageSlice.reducer;