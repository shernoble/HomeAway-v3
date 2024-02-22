
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
// import { Footer } from '../../components/Footer/Footer';
import { Footer } from '../../components/Footer2/GFooter';
import { PasswordChangeForm } from '../../components/EditPass/EditPass';
import { HelmetProvider,Helmet } from 'react-helmet-async';
import { Loading } from '../../components/Loading/Loading';

export function ChangePassword (){
    const [isLoading, setIsLoading] = useState(true);
    const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';

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
                <PasswordChangeForm user={user} endpoint={endpoint}/>
            )}<Footer/>
        </HelmetProvider>
    );
};

