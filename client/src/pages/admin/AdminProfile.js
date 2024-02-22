import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { ProfileCard } from '../../components/profileCard/ProfileCard';
import {Loading} from '../../components/Loading/Loading'; // Import your loader component
import { Footer } from '../../components/Footer2/GFooter';

export function AdminProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state => state.auth.user);
    console.log("user : " + user);

    // Simulate loading delay
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Simulating 2 seconds loading time
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
                <title>Profile-Admin</title>
            </Helmet>
            <AdminHeader />
            {isLoading ? (
                <Loading /> // Render loader while loading
            ) : (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <ProfileCard user={user} />
                        </div>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center mt-3">
                        <Link to="/admin/editPass" className="btn btn-outline-danger">
                            Change Password
                        </Link>
                    </div>
                </div>
            )}
            <Footer/>
        </HelmetProvider>
    );
};
