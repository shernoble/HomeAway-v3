
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HostRegisterForm } from "../../components/HostRegisterForm/HostRegisterForm"

export function HostRegister(){
    const title="HomeAway(Host)";
    const picno="/imgs/12.jpg";

    return (
        <HelmetProvider>
            <Helmet>
                <title>Register-Host</title>
            </Helmet>
            <HostRegisterForm 
            title={title}
            picno={picno}
            />
        </HelmetProvider>
    )

}

