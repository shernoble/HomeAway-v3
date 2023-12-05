import { Routes,Route,Navigate } from "react-router-dom";
import { useEffect } from "react";
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
import { useSelector,useDispatch} from "react-redux";
import { AuthActions } from "../store/authSlice";



export function GuestRoutes(){

    const dispatch=useDispatch();
    const isUser=useSelector(state => state.auth.user);
    // console.log("isuser guest?"+isUser);
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

            {isUser &&
                <Route path="startingPage" element={<GuestStartingPage />} />
            }
            {isUser &&
                <Route path="homePage" element={<GuestHomepage/>} />
            }
            {isUser &&
                <Route path="homepagefull" element={<GuestHomepage/>} />
            }
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
            <Route path="NotFound" element={<NotFoundPage/>} />
            {/* not login , redirect to page not found */}
            <Route path="*"
                element={isUser?<Navigate to='notFound' replace/>:<Navigate to="login" replace />}>              
            </Route>
        </Routes>
    )
    

}