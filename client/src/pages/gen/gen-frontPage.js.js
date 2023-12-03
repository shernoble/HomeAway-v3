import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';
// import "./frontPage.css";

export function FirstPage(){
    return (
        <HelmetProvider>
            {
                <Helmet>
                <link rel="stylesheet" href="/css/frontPage.css" />
                </Helmet>
            }
        <div className="row">
        <div className="colm-form">
            <div className="form-container">
            <p style={{ fontSize: '25px', fontWeight: 'bold', color: 'white' }}>Join As</p>

            <div className="dropdown dropend">
                <button type="button" id="admin" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Admin
                </button>

                <div className="dropdown-menu">
                <Link to="/admin/login" className="dropdown-item">
                    Login
                </Link>
                <Link to="/admin/register" className="dropdown-item">
                    Signup
                </Link>
                </div>
            </div>

            <div className="dropdown dropend">
                <button
                type="button" id="guest" className="btn btn-primary dropdown-toggle"
                // style={{ marginTop: '10px' }}
                data-bs-toggle="dropdown"
                >
                Guest
                </button>

                <div className="dropdown-menu">
                <Link to="/guest/login" className="dropdown-item">
                    Login
                </Link>
                <Link to="/guest/register" className="dropdown-item">
                    Signup
                </Link>
                {/* <Link to="/guest/homepage" className="dropdown-item">
                    Skip
                </Link> */}
                </div>
            </div>

            <div className="dropdown dropend">
                <button type="button" id="host" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Host
                </button>

                <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">
                    Login
                </Link>
                <Link to="/register" className="dropdown-item">
                    Signup
                </Link>
                </div>
            </div>
            </div>
        </div>
        </div>
        </HelmetProvider>
    );
};

