import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../../store/authSlice';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function HostNav({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(AuthActions.logout());
        navigate("/host/login");
    };

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/HostNav.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            <nav className="navbar header">
                <h2 className="heading1">HomeAway</h2>
            </nav>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#294d48', color: 'white' }}>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link to="/host/p1h" className="nav-link" style={{ color: 'white', fontSize: '25px' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/host/p12h" className="nav-link" style={{ color: 'white', fontSize: '25px' }}>Listings</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                href="#"
                                style={{ color: 'white', fontSize: '25px' }}
                            >
                                Profile
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link to="/host/hostprof" className="dropdown-item">View Profile</Link>
                                <Link to="/host/editPass" className="dropdown-item">Edit Password</Link>
                                <Link to="/host/login" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </HelmetProvider>
    );
}

export default HostNav;
