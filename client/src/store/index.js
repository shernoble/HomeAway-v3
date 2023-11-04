// redux store
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dataReducer from "./adminHomePage";

const store=configureStore({

    reducer:{
        data:dataReducer
    },
    middleware:[thunk],

})

export default store;