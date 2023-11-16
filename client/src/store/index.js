// redux store
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authSliceReducer from "./authSlice";
import guestDestinationSliceReducer from "./guestDestinationSlice";
import guestResults from "./guestResults";

const store=configureStore({

    reducer:{
        auth:authSliceReducer,
        destination:guestDestinationSliceReducer,
        guestSearch:guestResults,
    },
    middleware:[thunk],

})

export default store;