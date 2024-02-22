import { Routes,Route } from "react-router-dom";

import { FirstPage } from "../pages/gen/gen-frontPageNew.js";
import { ContactUs } from "../pages/gen/ContactUs.js";
import { AboutUs } from "../pages/gen/AboutUs.js";
import { FAQ } from "../pages/gen/FAQ.js";
import { TermsOfService } from "../pages/gen/TermsOfService.js";
import { PrivacyPolicy } from "../pages/gen/PrivacyPolicy.js";


export function GenRoutes(){

    return (
        <Routes>
            <Route index element={<FirstPage />} />
            <Route path="AboutUs" element={<AboutUs/>} />
            <Route path="FAQ" element={<FAQ/>} />
            <Route path="ContactUs" element={<ContactUs/>} />
            <Route path="TermsOfService" element={<TermsOfService/>} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy/>} />
        </Routes>
    )

}