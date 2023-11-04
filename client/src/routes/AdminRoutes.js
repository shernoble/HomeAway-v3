import { Routes,Route } from "react-router-dom";

import {AdminLogin} from "../pages/admin/AdminLogin";
import {AdminRegister} from "../pages/admin/AdminRegister";
import AdminHomePage from "../pages/admin/AdminHomePage";

export function AdminRoutes(){

    return (
        <Routes>
            <Route path="login" element={<AdminLogin/>} />
            <Route path="register" element={<AdminRegister/>} />
            <Route path="logout" element={<></>} />
            <Route path="startingPage" element={<></>} />
            <Route path="homePage" element={<AdminHomePage/>} />
            <Route path="homePageFull" element={<></>} />
            <Route path="report" element={<></>} />
            <Route path="profile" element={<></>} />
            <Route path="editPass" element={<></>} />
        </Routes>
    )
    

}