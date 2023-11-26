
import { LoginForm } from "../../components/LoginForm/LoginForm";

export function AdminLogin(){
    const registerLink="/admin/register";
    const navigateLink="/admin/guestList";
    const postLink="http://localhost:5050/admin/login";
    const title="HomeAway(Admin)";
    const picno="/imgs/56.jpg";

    return (
        <>
            <LoginForm 
            registerLink={registerLink} 
            navigateLink={navigateLink} 
            postLink={postLink}
            title={title}
            picno={picno}
            />
        </>
    )

}