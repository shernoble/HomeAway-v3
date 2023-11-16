import { Routes,Route } from "react-router-dom";

import { FirstPage } from "../pages/gen/gen-frontPage.js";


export function GenRoutes(){

    return (
        <Routes>
            <Route index element={<FirstPage />} />
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