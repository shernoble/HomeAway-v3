import React from 'react';
import { Link } from 'react-router-dom';

export function GuestNav() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#78938A' }} aria-label="Twelfth navbar example">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/guest/homepagefull" className="nav-link active" aria-current="page" style={{ color: '#ffffff' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/guest/report" className="nav-link" style={{ color: '#ffffff' }}>Report</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AboutUs" className="nav-link" style={{ color: '#ffffff' }}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ContactUs" className="nav-link" style={{ color: '#ffffff' }}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/FAQ" className="nav-link" style={{ color: '#ffffff' }}>FAQs</Link>
                        </li>
                        {/* <li className="nav-item">
                            <span className="nav-link" style={{ color: '#ffffff' }}>Disabled</span>
                        </li> */}
                        {/* <li className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#ffffff' }}>Dropdown</Link>
                            <ul className="dropdown-menu">
                                <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Action</Link></li>
                                <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Another action</Link></li>
                                <li><Link to="#" className="dropdown-item" style={{ color: '#557571' }}>Something else here</Link></li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

