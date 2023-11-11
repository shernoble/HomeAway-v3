import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
};

const authSlice=createSlice({
    name:'authUser',
    initialState,
    reducers:{
        loginSuccess(state,action){
            state.user=action.payload;
        },
        // loginFalse(state,action){
        //     state.isAuthenticated=false;
        //     // state.user=action.payload.user;
        //     state.error=action.payload.error;
        // },
        // registerSuccess(state){
        //     state.error=null;
        // },
        // registerFalse(state,action){
        //     console.log("action.payload = "+action.payload);
        //     state.error=action.payload.error;
        // },
        logout(state,action){
            state.user=null;
        }
    }
});

export const AuthActions=authSlice.actions;

export default authSlice.reducer;