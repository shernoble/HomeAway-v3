import { Routes,Route } from "react-router-dom";

import { FrontPage } from "../components/FrontPage/FrontPage";


export function GenRoutes(){

    return (
        <Routes>
            <Route index element={<FrontPage />} />
            <Route path="register" element={<></>} />
            <Route path="logout" element={<></>} />
            <Route path="startingPage" element={<></>} />
            <Route path="homePage" element={<></>} />
            <Route path="homePageFull" element={<></>} />
            <Route path="report" element={<></>} />
            <Route path="profile" element={<></>} />
            <Route path="editPass" element={<></>} />
        </Routes>
    )
    

}