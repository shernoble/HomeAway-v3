import { createSlice } from "@reduxjs/toolkit";

const initialState={
    response:null,
    listing:localStorage.getItem("listing"),
    fromDate:localStorage.getItem("fromDate"),
    toDate:localStorage.getItem("toDate")
}

const guestResults=createSlice({
    name:'searchResults',
    initialState,
    reducers:{
        storeResults(state,action){
            state.response=action.payload;
        },
        storeReservation(state,action){
            state.listing=action.payload.listing;
            state.fromDate=action.payload.dates.fromDate;
            state.toDate=action.payload.dates.toDate;
            const fromDate = state.fromDate.toString(); // Convert date to ISO string format
            const toDate = state.toDate.toString(); // Convert date to ISO string format

// Store the date string in local storage
            localStorage.setItem('fromDate', fromDate);
            localStorage.setItem("listing", JSON.stringify({ ...action.payload.listing }));
            localStorage.setItem("toDate",toDate);
        }
    }
})

export const guestResultsActions=guestResults.actions;

export default guestResults.reducer;