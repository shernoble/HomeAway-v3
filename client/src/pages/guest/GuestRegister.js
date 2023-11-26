
import { RegisterForm } from "../../components/RegisterForm.js/RegisterForm"

export function AdminRegister(){
    const navigateLink="/guest/startingPage";
    const registerLink="http://localhost:5050/guest/register";
    const title="HomeAway(Guest)";
    const picno="/imgs/12.jpg";

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

