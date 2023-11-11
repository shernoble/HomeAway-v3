import { Routes,Route } from "react-router-dom";

import {AdminLogin} from "../pages/admin/AdminLogin";
import {AdminRegister} from "../pages/admin/AdminRegister";
import {AdminGuestList} from "../pages/admin/AdminGuestList";
import { AdminHostList } from "../pages/admin/AdminHostList";
import { AdminReports } from "../pages/admin/AdminReports";
import { AdminHomePage } from "../pages/admin/AdminHomePage";

export function AdminRoutes(){

    return (
        <Routes>
            <Route path="login" element={<AdminLogin/>} />
            <Route path="register" element={<AdminRegister/>} />
            <Route path="logout" element={<></>} />
            <Route path="homePage" element={<AdminHomePage/>} />
            <Route path="guestList" element={<AdminGuestList/>} />
            <Route path="hostList" element={<AdminHostList/>} />
            <Route path="reports" element={<AdminReports/>} />
            <Route path="profile" element={<></>} />
            <Route path="editPass" element={<></>} />
        </Routes>
    )
    

}