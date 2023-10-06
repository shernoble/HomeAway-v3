import { Routes,Route } from "react-router-dom";

import { GuestStartingPage } from "../pages/guest-startingpage";
import {GuestLogin} from "../pages/guest-login";
import {GuestRegister} from "../pages/guest-register";

export function GuestRoutes(){

    return (
        <Routes>
            <Route path="login" element={<GuestLogin />} />
            <Route path="register" element={<GuestRegister/>} />
            <Route path="logout" element={<></>} />
            <Route path="startingPage" element={<GuestStartingPage />} />
            <Route path="homePage" element={<></>} />
            <Route path="homePageFull" element={<></>} />
            <Route path="report" element={<></>} />
            <Route path="profile" element={<></>} />
            <Route path="editPass" element={<></>} />
        </Routes>
    )
    

}