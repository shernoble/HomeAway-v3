import { useSelector } from 'react-redux';

// import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import AdminHeader from "../../components/AdminHeader/AdminHeader"
import { PasswordChangeForm } from '../../components/EditPass/EditPass';
import { HelmetProvider,Helmet } from 'react-helmet-async';

export function AdminChangePassword (){
    const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';

    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Admin</title>
            </Helmet>
            <AdminHeader/>
            <PasswordChangeForm user={user} endpoint={endpoint}/>
        </HelmetProvider>
    );
};

