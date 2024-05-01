
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HostRegisterForm } from "../../components/HostRegisterForm/HostRegisterForm"

export function HostRegister(){
    const title="HomeAway(Host)";
    const picno="/imgs/12.jpg";
    const navigateLink="/host/login";
    const registerLink="http://localhost:5050/host/register";
    return (
        <HelmetProvider>
            <Helmet>
                <title>Register-Host</title>
            </Helmet>
            <HostRegisterForm 
            registerLink={registerLink}
            navigateLink={navigateLink}
            title={title}
            picno={picno}
            />
        </HelmetProvider>
    )

}

