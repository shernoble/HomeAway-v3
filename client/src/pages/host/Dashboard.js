import { useSelector } from 'react-redux';
import HostNav from "../../components/HostNav/HostNav";
import { HelmetProvider,Helmet } from 'react-helmet-async';
import { Dashboardcontent } from '../../components/Dashboardcontent/Dashboardcontent';
export function Dashboard (){
    const user=useSelector(state => state.auth.user);
    return (
        <HelmetProvider>
            <Helmet>
                <title>EditPassword-Host</title>
                <link rel="stylesheet" href="/css/HostNav.css" />
            </Helmet>
            <HostNav user={user} />
            <Dashboardcontent />
        </HelmetProvider>
    );
};

