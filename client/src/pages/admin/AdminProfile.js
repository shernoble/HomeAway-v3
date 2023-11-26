import { useSelector } from 'react-redux';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { ProfileCard } from '../../components/profileCard/ProfileCard';
export function AdminProfile (){

    const user=useSelector(state => state.auth.user);
    console.log("user : "+user);

    return (
        <HelmetProvider>
        {
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
            </Helmet>
        }
        <AdminHeader/>
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
        </HelmetProvider>
    );
};
