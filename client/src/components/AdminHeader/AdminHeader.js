import React from 'react';
import { Link } from 'react-router-dom'; // Import React Router's Link for navigation
import "./adminHeader.css";

function AdminHeader() {
    return (
        <div>
        <nav className="navbar header">
            <h2 className="heading1">HomeAway-admin</h2>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                <Link to="/admin/homePage" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/guestList" className="nav-link">Guestlist</Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/hostList" className="nav-link">Hostlist</Link>
                </li>
                <li className="nav-item">
                <Link to="/admin/reports" className="nav-link">Reports</Link>
                </li>
                <li className="nav-item dropdown">
                <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    href="#"
                >
                    Admin Profile
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/admin/logout">
                    Logout
                    </a>
                    <Link to="/admin/profile" className="dropdown-item">
                    View Profile
                    </Link>
                </div>
                </li>
            </ul>
            </div>
        </nav>
        </div>
    );
}

export default AdminHeader;
