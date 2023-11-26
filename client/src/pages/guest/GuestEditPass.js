
import { useSelector } from 'react-redux';

import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { PasswordChangeForm } from '../../components/EditPass/EditPass';


export function ChangePassword (){
    const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/guest/editPass';

    return (
        <>
        <GuestHeader/>
        <PasswordChangeForm user={user} endpoint={endpoint}/>
        </>
    );
};

