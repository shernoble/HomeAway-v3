
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HostLoginForm } from "../../components/HostLoginForm/HostLoginForm";

export function HostLogin(){
    const registerLink="/host/register";
    const navigateLink="/host/dashboard";
    const postLink="http://localhost:5050/host/login";
    const title="HomeAway(Host)";
    const picno="/imgs/34.jpg";

    return (
        <HelmetProvider>
            <Helmet>
                <title>Host-Login</title>
            </Helmet>
            <HostLoginForm 
            postLink={postLink}
            registerLink={registerLink} 
            navigateLink={navigateLink} 
            title={title}
            picno={picno}
            />
        </HelmetProvider>
    )

}