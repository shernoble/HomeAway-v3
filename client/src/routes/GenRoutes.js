import { Routes,Route } from "react-router-dom";

import { FirstPage } from "../pages/gen/gen-frontPageNew.js";
import { ContactUs } from "../pages/gen/ContactUs.js";
import { AboutUs } from "../pages/gen/AboutUs.js";
import { FAQ } from "../pages/gen/FAQ.js";


export function GenRoutes(){

    return (
        <Routes>
            <Route index element={<FirstPage />} />
            <Route path="AboutUs" element={<AboutUs/>} />
            <Route path="FAQ" element={<FAQ/>} />
            <Route path="ContactUs" element={<ContactUs/>} />
        </Routes>
    )

}