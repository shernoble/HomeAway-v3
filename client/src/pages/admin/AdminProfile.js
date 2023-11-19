import { useSelector } from 'react-redux';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';

export function AdminProfile (){

    const user=useSelector(state => state.auth.user);

    return (
        <HelmetProvider>
        {
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
            </Helmet>
        }
        <GuestHeader/>
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="profile-card">
                    <h1>User Profile</h1>
                    <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" className="form-control" value={user.UserName} readOnly />
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" className="form-control" value={user.Email} readOnly />
                    </div>
                    <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" id="phone" className="form-control" value={user.PhoneNumber} readOnly />
                    </div>
                </div>
            </div>
        </div>
        </div>
        </HelmetProvider>
    );
};
