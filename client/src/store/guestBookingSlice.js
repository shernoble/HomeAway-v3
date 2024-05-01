// NOT USED
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    booking:null,
};

const guestBookingSlice=createSlice({
    name:'guestBooking',
    initialState,
    reducers:{
        bookingInfo(state,action){
            state.booking=action.payload;
        },
        bookingInfoDestroy(state){
            state.values=null;
        }
    }
});

export const guestBookingActions=guestBookingSlice.actions;
export default guestBookingSlice.reducer;