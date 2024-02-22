
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm"

export function AdminRegister(){
    const navigateLink="/admin/guestList";
    const registerLink="http://localhost:5050/admin/register";
    const title="HomeAway(Admin)";
    const picno="/imgs/56.jpg";
    const loginLink="/admin/login";
    const role="admin";

    return (
        <HelmetProvider>
            <Helmet>
                <title>Admin-Register</title>
            </Helmet>
            <RegisterForm 
            registerLink={registerLink}
            navigateLink={navigateLink}
            title={title}
            picno={picno}
            loginLink={loginLink}
            role={role}
            />
        </HelmetProvider>
    )

}

