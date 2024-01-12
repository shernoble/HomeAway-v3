// NOT USED
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    values:null,
};

const guestDestinationSlice=createSlice({
    name:'guestDestination',
    initialState,
    reducers:{
        destinationInfo(state,action){
            state.values=action.payload;
        },
        destinationInfoDestroy(state){
            state.values=null;
        }
    }
});

export const guestDestinationActions=guestDestinationSlice.actions;
export default guestDestinationSlice.reducer;