// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PasswordChangeForm } from '../../components/hostEditPass/hostEditPass';
import { HelmetProvider,Helmet } from 'react-helmet-async';
import HostNav from '../../components/HostNav/HostNav';
export function HostEditPass (){
    // const user=useSelector(state => state.auth.user);
    const endpoint = 'http://localhost:5050/host/pass';
    // console.log(user);
    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Host</title>
                <link rel="stylesheet" href="/css/HostNav.css" />
            </Helmet>
            <HostNav />
            <Link to="/host/dashboard">
                <i className="fas fa-arrow-left button" id="prev"></i>
            </Link>
            <PasswordChangeForm endpoint={endpoint}/>
        </HelmetProvider>
    );
};

