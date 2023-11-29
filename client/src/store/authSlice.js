import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user"),
};

const authSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        login(state, action) {
        state.user = action.payload;

        // Save user information in localStorage with expiration time
        const expiresInMinutes = 60; // Adjust the expiration time as needed
        const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000;
        localStorage.setItem("user", JSON.stringify({ ...action.payload, expirationTime }));
        },
        getUser(state){
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.expirationTime < new Date().getTime()) {
                localStorage.removeItem("user");
                state.user = null;
            } else {
                state.user = storedUser;
            }
        },
        logout(state, action) {
        state.user = null;

        // Remove user information from localStorage on logout
        localStorage.removeItem("user");
        },
    },
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
