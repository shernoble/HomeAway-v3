import { createSlice } from "@reduxjs/toolkit";

const initialState={
    response:null,
    reservation:{
        listing:null,
        fromDate:null,
        toDate:null,
    }
}

const guestResults=createSlice({
    name:'searchResults',
    initialState,
    reducers:{
        storeResults(state,action){
            state.response=action.payload;
        },
        storeReservation(state,action){
            state.reservation.listing=action.payload.listing;
            state.reservation.fromDate=action.payload.dates.fromDate;
            state.reservation.toDate=action.payload.dates.toDate;
        }
    }
})

export const guestResultsActions=guestResults.actions;

export default guestResults.reducer;