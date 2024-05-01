import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { AdminRegister } from "../pages/admin/AdminRegister";
import { AdminGuestList } from "../pages/admin/AdminGuestList";
import { AdminHostList } from "../pages/admin/AdminHostList";
import { AdminReports } from "../pages/admin/AdminReports";
import { ReportDetailsPage } from "../pages/admin/ReportDetailsPage";
import { AdminHomePage } from "../pages/admin/AdminHomePage";
import { AdminChangePassword } from "../pages/admin/AdminEditPass";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { NotFoundPage } from "../pages/gen/NotFound404";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthActions } from "../store/authSlice";
import { RegistrationForm } from "../pages/admin/AdminCreate";

export function AdminRoutes() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);

    useEffect(() => {
        // Fetch user details when the component mounts
        dispatch(AuthActions.getUser());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route path="register" element={<AdminRegister />} />

            {role === 'admin' && (
                <>
                    <Route path="logout" element={<></>} />
                    <Route path="homePage" element={<AdminHomePage />} />
                    <Route path="guestList" element={<AdminGuestList />} />
                    <Route path="hostList" element={<AdminHostList />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="reports/:id" element={<ReportDetailsPage/>} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="editPass" element={<AdminChangePassword />} />
                    <Route path="createuser" element={<RegistrationForm/>} />
                </>
            )}

            <Route path="NotFound" element={<NotFoundPage />} />
            
            {/* If the user is not logged in or the role is not 'admin', redirect to login */}
            <Route path="*" element={(!user || role !== 'admin') ? <Navigate to="/admin/login" replace /> : <Navigate to="/NotFound" replace />} />
        </Routes>
    )
}
