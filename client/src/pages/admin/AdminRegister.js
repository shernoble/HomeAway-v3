
import { RegisterForm } from "../../components/RegisterForm.js/RegisterForm"

export function AdminRegister(){
    const navigateLink="/admin/guestList";
    const registerLink="http://localhost:5050/admin/register";
    const title="HomeAway(Admin)";
    const picno="/imgs/56.jpg";

    return (
        <>
            <RegisterForm 
            registerLink={registerLink}
            navigateLink={navigateLink}
            title={title}
            picno={picno}
            />
        </>
    )

}

