import { Routes,Route,Navigate } from "react-router-dom";
// import { useEffect } from "react";
import { GuestStartingPage } from "../pages/guest/GuestStartingPage";
import {GuestLogin} from "../pages/guest/GuestLogin";
import {GuestRegister} from "../pages/guest/GuestRegister";
import { NotFoundPage } from "../pages/gen/NotFound404";
import {GuestHomepage} from "../pages/guest/GuestFilterPage";
import { GuestReservation } from "../pages/guest/GuestReservation";
import { GuestConfirmation } from "../pages/guest/GuestConfirmation";
import { GuestProfile } from "../pages/guest/GuestProfile";
import { UserReportForm } from "../pages/guest/GuestReport";
import { ChangePassword } from "../pages/guest/GuestEditPass";
import { Checkout } from "../pages/guest/GuestPayment";
// import { AboutUs } from "../pages/gen/AboutUs";
// import { FAQ } from "../pages/gen/FAQ";
import { useSelector} from "react-redux";
import { GuestBookingDetails } from "../pages/guest/GuestBookingDetails";
import { Success } from "../pages/guest/GuestSuccess";
import { Fail } from "../pages/guest/GuestFail";
// import { AuthActions } from "../store/authSlice";



export function GuestRoutes(){

    // const dispatch=useDispatch();
    const user=useSelector(state => state.auth.user);
    const role=useSelector(state => state.auth.role);
    const listing=useSelector(state => state.guestSearch.listing)
    console.log("user : ");
    console.log(user);
    console.log(listing);
    console.log(role==="guest");//false?damn
    // useEffect(() => {
    //     // Fetch user details when the component mounts
    //     dispatch(AuthActions.getUser());
    // }, [dispatch]);



    return (
        <Routes>
            <Route path="login" element={<GuestLogin />} />
            <Route path="register" element={<GuestRegister/>} />
            {/* (role === 'Guest' ||role === 'guest') && */}
            { user && (
                <>
                    <Route path="startingPage" element={<GuestStartingPage />} />
                    <Route path="homePage" element={<GuestHomepage/>} />
                    <Route path="homepagefull" element={<GuestHomepage/>} />
                    <Route path="reserve/:id" element={<GuestReservation/>} />
                    <Route path="confirm/:success?" element={<GuestConfirmation/>} />
                    <Route path="report" element={<UserReportForm/>} />
                    <Route path="profile" element={<GuestProfile/>} />
                    <Route path="editPass" element={<ChangePassword/>} />
                    <Route path="payment" element={<Checkout/>} />
                    <Route path="bookingdetails/:iscurr/:status" element={<GuestBookingDetails/>}/>
                    <Route path="success" element={<Success/>}/>
                    <Route path="fail" element={<Fail/>}/>
                    {/* <Route path="aboutUs" element={<AboutUs/>} />
                    <Route path="faqs" element={<FAQ/>} /> */}
                </>
            )}

            <Route path="NotFound" element={<NotFoundPage/>} />
            
            {/* If the user is not logged in or the role is not 'guest', redirect to login */}
            <Route path="*" element={(!user || role !== 'guest') ? <Navigate to="/guest/login" replace /> : <Navigate to="/NotFound" replace />} />
        </Routes>
    )
    

}