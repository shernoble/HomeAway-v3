import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:'',
    email:'',
    password:'',
    isLogin:false
}

const adminLoginSlice=createSlice({
    name:'adminLogin',
    initialState,
    reducers:{
        login(state){
            state.isLogin=true;
            
        },
        logout(state){

        }
    }
})