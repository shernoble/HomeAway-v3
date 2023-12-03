
import { useSelector } from 'react-redux';

import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { Footer } from '../../components/Footer/Footer';
import { PasswordChangeForm } from '../../components/EditPass/EditPass';
import { HelmetProvider,Helmet } from 'react-helmet-async';


export function ChangePassword (){
    const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';

    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Guest</title>
            </Helmet>
            <GuestHeader/>
            <PasswordChangeForm user={user} endpoint={endpoint}/>
            <Footer/>
        </HelmetProvider>
    );
};

