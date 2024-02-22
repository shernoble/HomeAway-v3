
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LoginForm } from "../../components/LoginForm/LoginForm";

export function GuestLogin(){
    const registerLink="/guest/register";
    const navigateLink="/guest/startingPage";
    const postLink="http://localhost:5050/guest/login";
    const title="HomeAway(Guest)";
    const role="guest";
    const picno="/imgs/12.jpg";

    return (
        <HelmetProvider>
            <Helmet>
                <title>Guest-Login</title>
            </Helmet>
            <LoginForm 
            registerLink={registerLink} 
            navigateLink={navigateLink} 
            postLink={postLink}
            title={title}
            picno={picno}
            role={role}
            />
        </HelmetProvider>
    )

}