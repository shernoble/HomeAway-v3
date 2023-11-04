
import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
// import "../assets/css/startingPage.css"
import { Helmet,HelmetProvider } from "react-helmet-async";

export function GuestRegister(){

    // usestate
    // const [numguests,setNumGuests]=useState(2);
    const navigate = useNavigate();
    const [formvalues,setFormValues]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""
    });
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setisSubmit]=useState(false);

    

    const handleChange = (e) => {
        const {name,value}=e.target;
        console.log("name:"+name+" val:"+value);
        setFormValues({...formvalues,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        const newUser={...formvalues};

        await fetch("http://localhost:5050/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setFormValues({username:"",email:"",phone:"",password:"",confirmPassword:""});
        setFormErrors(validateForm(formvalues));
        setisSubmit(true);
        navigate("/");
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formvalues);
        }

    },[formErrors, formvalues, isSubmit])

    const validateForm =(values) => {

        const errors={};
        
        return errors;

    }

    return (
        <HelmetProvider>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/guest-login.css" />
                </Helmet>
            }
            <section className="vh-100">
                <div className="container  py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: '1rem'}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                            <img src="/imgs/12.jpg"
                                alt="login form" className="img-fluid h-125" style={{borderRadius: '1rem 1rem 1rem 1rem'}}/>
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex ">
                            <div className="card-body p-4 p-lg-4 text-black">

                                <form  method="POST">

                                <div className="d-flex align-items-center mb-3 pb-1">
                                <span className="h1 fw-bold mb-4">Home Away (Guest)</span>
                                </div>
            
                                <h5 className="fw-medium mb-4 pb-3" style={{letterSpacing: '1px'}}>Sign up your account</h5>

                                <div className="form-outline mb-4">
                                    <input type="text" className="form-control form-control-md" id="username" name="username" 
                                    value={formvalues.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username" required />
                                </div>
            
                                <div className="form-outline mb-4">
                                <input type="email" className="form-control form-control-md" id="email" name="email" 
                                value={formvalues.email}
                                onChange={handleChange}
                                placeholder="Email address" required />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" className="form-control form-control-md" id="phone" name="phone" 
                                    value={formvalues.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number" required />
                                </div>
            
                                <div className="form-outline mb-4">
                                <input type="password" className="form-control form-control-md" id="password" name="password" 
                                value={formvalues.password}
                                onChange={handleChange}
                                placeholder="Password" required />
                                </div>

                                <div className="form-outline mb-4">
                                <input type="password" className="form-control form-control-md" id="confirmPassword" name="confirmPassword" 
                                value={formvalues.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password" required />
                                </div>
            
                                <div className="pt-0 mb-4">
                                <button className="btn btn-dark btn-md btn-block" type="submit"
                                onClick={handleSubmit}
                                >SIGNUP</button>
                                </div>

                                <p className="mb-0 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="/guest/login"
                                    style={{color: '#393f81'}}>Login</a></p>
                                </form>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </HelmetProvider>
    )

}