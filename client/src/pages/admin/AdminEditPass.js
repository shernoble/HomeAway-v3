import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { PasswordChangeForm } from '../../components/EditPass/EditPass';
import {Loading} from '../../components/Loading/Loading'; // Assuming you have a Loading component
import { Footer } from '../../components/Footer2/GFooter';

export function AdminChangePassword (){
    const user = useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';
    const [isLoading, setIsLoading] = useState(true);

    // Simulating loading for demonstration purposes
    useEffect(() => {
        // Simulate loading for 2 seconds, then set isLoading to false
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Admin</title>
            </Helmet>
            <AdminHeader/>

            {isLoading ? (
                // Show Loading while loading
                <Loading />
            ) : (
                // Once loading is finished, render the password change form
                <PasswordChangeForm user={user} endpoint={endpoint}/>
            )}
        <Footer/>
        </HelmetProvider>
    );
};
