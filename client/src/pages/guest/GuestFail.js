

import { useEffect,useState } from 'react';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
// import { Footer } from '../../components/Footer/Footer';
import { Footer } from '../../components/Footer2/GFooter';

import { HelmetProvider,Helmet } from 'react-helmet-async';
import { Loading } from '../../components/Loading/Loading';

export function Fail (){
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simulate loading for 2 seconds, then set isLoading to false
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Guest</title>
            </Helmet>
            <GuestHeader/>
            <GuestNav/>
            {isLoading ? (
                // Show Loading while loading
                <Loading />
            ) : (
                // Once loading is finished, render the password change form
                <h3>FAIL????</h3>
            )}<Footer/>
        </HelmetProvider>
    );
};

