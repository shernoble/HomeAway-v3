import { useSelector } from 'react-redux';

// import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import AdminHeader from "../../components/AdminHeader/AdminHeader"
import { PasswordChangeForm } from '../../components/EditPass/EditPass';

export function AdminChangePassword (){
    const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';

    return (
        <>
        <AdminHeader/>
        <PasswordChangeForm user={user} endpoint={endpoint}/>
        </>
    );
};

