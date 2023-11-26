import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link for routing
import "./styles.css"
import { useSelector,useDispatch } from "react-redux";
import { AuthActions } from "../../store/authSlice";

export function GuestHeader({ userLoggedIn }) {

    // const navigate=useNavigate();
    const dispatch=useDispatch();
    const isUser=useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(AuthActions.logout());
        // navigate("/guest/login");
    }

    return (
        <div className="navbar header">
        <Link to="/guest/homepagefull">
            <h2 className="heading1">HomeAway</h2>
        </Link>

        <div className="dropdown show drop-css">
            <div className="container mt-5">
            <div className="dropdown">
                <NavLink
                className="dropdown-toggle text-reset"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >
                <i className="far fa-user fa-xl profile-img"></i>
                </NavLink>
                <div className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink">
                {isUser ? (
                    <>
                    <Link to="/guest/profile" className="dropdown-item">
                        Profile
                    </Link>
                    <Link to="/guest/login" onClick={handleLogout} className="dropdown-item">
                        Logout
                    </Link>
                    <Link to="/guest/report" className="dropdown-item">
                        Report
                    </Link>
                    <Link to="/guest/homepagefull" className="dropdown-item">
                        Home
                    </Link>
                    </>
                ) : (
                    <>
                    <Link to="/guest/login" className="dropdown-item">
                        Login
                    </Link>
                    <Link to="/guest/register" className="dropdown-item">
                        Signup
                    </Link>
                    <Link to="/guest/homepagefull" className="dropdown-item">
                        Home
                    </Link>
                    </>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
