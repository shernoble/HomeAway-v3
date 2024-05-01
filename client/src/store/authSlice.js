import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user"),
    role:localStorage.getItem("role"),
};

const authSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user;
            state.role=action.payload.role;
            // Save user information in localStorage with expiration time
            const expiresInMinutes = 60; // Adjust the expiration time as needed
            const expirationTime = new Date().getTime() + expiresInMinutes * 60 * 1000;
            localStorage.setItem("user", JSON.stringify({ ...action.payload.user, expirationTime }));
            localStorage.setItem("role",JSON.stringify({ ...action.payload.role }))
        },
        getUser(state){
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const storedRole = JSON.parse(localStorage.getItem("role"));
            if (storedUser && storedUser.expirationTime < new Date().getTime()) {
                localStorage.removeItem("user");
                localStorage.removeItem("role");
                state.user = null;
                state.role=null;
            } else {
                state.user = storedUser;
                state.role=storedRole;
            }
        },
        logout(state, action) {
            state.user = null;

            // Remove user information from localStorage on logout
            localStorage.removeItem("user");
            localStorage.removeItem("role");
        },
    },
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
