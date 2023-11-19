import { Routes,Route,Navigate } from "react-router-dom";
import { useEffect } from "react";
import { GuestStartingPage } from "../pages/guest/GuestStartingPage";
import {GuestLogin} from "../pages/guest/GuestLogin";
import {GuestRegister} from "../pages/guest/GuestRegister";
import {GuestHomepage} from "../pages/guest/GuestHomePage";
import { GuestReservation } from "../pages/guest/GuestReservation";
import { GuestConfirmation } from "../pages/guest/GuestConfirmation";
import { GuestProfile } from "../pages/guest/GuestProfile";
import { UserReportForm } from "../pages/guest/GuestReport";
import { ChangePassword } from "../pages/guest/GuestEditPass";
import { useSelector,useDispatch} from "react-redux";
import { AuthActions } from "../store/authSlice";



export function GuestRoutes(){

    const dispatch=useDispatch();
    const isUser=useSelector(state => state.auth.user);
    console.log("isuser guest?"+isUser);
    useEffect(() => {
        // Fetch user details when the component mounts
        dispatch(AuthActions.getUser());
    }, [dispatch]);
    // const isGuest=isUser.UserType==="Guest";
    // console.log("guest???"+isUser.UserType);


    return (
        <Routes>
            <Route path="login" element={<GuestLogin />} />
            <Route path="register" element={<GuestRegister/>} />
            <Route path="logout" element={<></>} />
            {isUser &&
                <Route path="startingPage" element={<GuestStartingPage />} />
            }
            {isUser &&
                <Route path="homePage" element={<GuestHomepage/>} />
            }
            {/* <Route path="homePageFull" element={<></>} /> */}
            {isUser &&
                <Route path="reserve/:id" element={<GuestReservation/>} />
            }
            {isUser &&
                <Route path="confirm" element={<GuestConfirmation/>} />
            }
            {isUser &&
                <Route path="report" element={<UserReportForm/>} />
            }
            {isUser &&
                <Route path="profile" element={<GuestProfile/>} />
            }
            {isUser &&
            <Route path="editPass" element={<ChangePassword/>} />
            }
            {/* not login , redirect to page not found */}
            <Route path="*"
                element={isUser?<Navigate to='notFound' replace/>:<Navigate to="login" replace />}>              
            </Route>
        </Routes>
    )
    

}