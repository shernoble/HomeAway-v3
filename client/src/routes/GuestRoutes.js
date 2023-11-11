import { Routes,Route } from "react-router-dom";

import { GuestStartingPage } from "../pages/guest/GuestStartingPage";
import {GuestLogin} from "../pages/guest/GuestLogin";
import {GuestRegister} from "../pages/guest/GuestRegister";
import {GuestHomepage} from "../pages/guest/GuestHomePage";
import { GuestReservation } from "../pages/guest/GuestReservation";
import { GuestConfirmation } from "../pages/guest/GuestConfirmation";

export function GuestRoutes(){

    return (
        <Routes>
            <Route path="login" element={<GuestLogin />} />
            <Route path="register" element={<GuestRegister/>} />
            <Route path="logout" element={<></>} />
            <Route path="startingPage" element={<GuestStartingPage />} />
            <Route path="homePage" element={<GuestHomepage/>} />
            {/* <Route path="homePageFull" element={<></>} /> */}
            <Route path="reserve/:id" element={<GuestReservation/>} />
            <Route path="confirm" element={<GuestConfirmation/>} />
            <Route path="report" element={<></>} />
            <Route path="profile" element={<></>} />
            <Route path="editPass" element={<></>} />
        </Routes>
    )
    

}