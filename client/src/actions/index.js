// actions.js
import axios from "axios"; // You can use Axios or any other HTTP client to make requests to your backend server

// export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
// export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
// export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

import { adminHomePageActions } from "../store/adminGuestPage";

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(adminHomePageActions.fetchDataRequest());

        try {
        const response = await axios.get("/admin/guestList");
        const data = response.data;

        dispatch(adminHomePageActions.fetchDataSuccess(data));
        console.log(data);
        } catch (error) {
        dispatch(adminHomePageActions.fetchDataFailure(error));
        }
    };
};
