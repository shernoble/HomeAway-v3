import { Helmet, HelmetProvider } from "react-helmet-async";
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import {Footer} from "../../components/Footer2/GFooter";

export function HostHomepage(){
    return(
        <HelmetProvider>
        {
            <Helmet>
                <title>Homepage-Host</title>
            </Helmet>
        }
        <GuestHeader/>

        <Footer/>
        </HelmetProvider>
    );
}