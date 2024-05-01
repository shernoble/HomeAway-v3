import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HostProfile } from '../../components/HostProfile/HostProfile';
import HostNav from '../../components/HostNav/HostNav';
 function HostProfilepage() {
    const user=useSelector(state => state.auth.user);
    
    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
                <title>Profile-Host</title>
            </Helmet>
            <HostNav user={user} />
            
            <Link to="/host/dashboard">
                <i className="fas fa-arrow-left button" id="prev"></i>
            </Link>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <HostProfile />
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default HostProfilepage;