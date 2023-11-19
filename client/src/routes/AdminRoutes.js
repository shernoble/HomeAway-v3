import { Routes,Route,Navigate } from "react-router-dom";

import {AdminLogin} from "../pages/admin/AdminLogin";
import {AdminRegister} from "../pages/admin/AdminRegister";
import {AdminGuestList} from "../pages/admin/AdminGuestList";
import { AdminHostList } from "../pages/admin/AdminHostList";
import { AdminReports } from "../pages/admin/AdminReports";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { AdminChangePassword } from "../pages/admin/AdminEditPass";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { useSelector } from "react-redux";



export function AdminRoutes(){

    const isUser=useSelector(state => state.auth.user);

    return (
        <Routes>
            <Route path="login" element={<AdminLogin/>} />
            <Route path="register" element={<AdminRegister/>} />

            {isUser && <Route path="logout" element={<></>} />}
            {isUser && <Route path="homePage" element={<AdminHomePage/>} />}
            {isUser && <Route path="guestList" element={<AdminGuestList/>} />}
            {isUser && <Route path="hostList" element={<AdminHostList/>} />}
            {isUser && <Route path="reports" element={<AdminReports/>} />}
            {isUser && <Route path="profile" element={<AdminProfile/>} />}
            {isUser && <Route path="editPass" element={<AdminChangePassword/>} />}
            <Route path="*"
                element={<Navigate to='login'/>}
            />

        </Routes>
    )
    

}