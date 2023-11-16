import { Routes,Route,Navigate } from "react-router-dom";

import { GuestStartingPage } from "../pages/guest/GuestStartingPage";
import {GuestLogin} from "../pages/guest/GuestLogin";
import {GuestRegister} from "../pages/guest/GuestRegister";
import {GuestHomepage} from "../pages/guest/GuestHomePage";
import { GuestReservation } from "../pages/guest/GuestReservation";
import { GuestConfirmation } from "../pages/guest/GuestConfirmation";
import { useSelector} from "react-redux";



export function GuestRoutes(){

    const isUser=useSelector(state => state.auth.user);


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
                <Route path="report" element={<></>} />
            }
            {isUser &&
                <Route path="profile" element={<></>} />
            }
            {isUser &&
            <Route path="editPass" element={<></>} />
            }
            {/* not login , redirect to page not found */}
            <Route path="*"
                element={isUser?<Navigate to='notFound' replace/>:<Navigate to="login" replace />}>              
            </Route>
        </Routes>
    )
    

}