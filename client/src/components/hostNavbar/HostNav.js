// import React from 'react';
// import { Link } from 'react-router-dom';

// export function HostNav() {
//     return (
//         <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#78938A' }} aria-label="Twelfth navbar example">
//             <div className="container-fluid">
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link to="/host/homepage" className="nav-link active" aria-current="page" style={{ color: '#ffffff' }}>Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/host/report" className="nav-link" style={{ color: '#ffffff' }}>Report</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="#" className="nav-link" style={{ color: '#ffffff' }}>My Bookings</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="#" className="nav-link" style={{ color: '#ffffff' }}>My Accommodations</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/AboutUs" className="nav-link" style={{ color: '#ffffff' }}>About</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/ContactUs" className="nav-link" style={{ color: '#ffffff' }}>Contact Us</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="/FAQ" className="nav-link" style={{ color: '#ffffff' }}>FAQs</Link>
//                         </li>
//                         {/* <li className="nav-item">
//                             <span className="nav-link" style={{ color: '#ffffff' }}>Disabled</span>
//                         </li> */}
//                         {/* <li className="nav-item dropdown">
//                             <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#ffffff' }}>Dropdown</Link>
//                             <ul className="dropdown-menu">
//                                 <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Action</Link></li>
//                                 <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Another action</Link></li>
//                                 <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Something else here</Link></li>
//                             </ul>
//                         </li> */}
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { AuthActions } from '../../store/authSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import './HostNav.css';


export function HostNav() {
    /*
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(AuthActions.logout());
        navigate("/host/login");
    }*/

    return (
        <>
            <nav className="navbar header">
                <h2 className="heading1">HomeAway</h2>
            </nav>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#78938A', color: 'white' }}>
                <button
                    className="navbar-toggler"
                    type="button"
                    
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" style={{backgroundColor:'#78938A'}}>
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item" >
                            <Link to="/host/p1h" className="nav-link" style={{ color: 'white' }}>Home</Link>
                        </li>
                        <li className="nav-item" >
                            <Link to="/host/Listings" className="nav-link" style={{ color: 'white' }}>Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/host/Bookings" className="nav-link" style={{ color: 'white' }}>Bookings</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                href="#"
                                style={{ color: 'white' }}
                            
                            >
                                Profile
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link to="/host/profile" className="dropdown-item">
                                    View Profile
                                </Link>
                                <Link to="/host/editPass" className="dropdown-item">
                                    Edit Password
                                </Link>
                                <Link to={"/host/login"} className="dropdown-item">
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

