
import { useState } from "react"
import {useDispatch} from "react-redux"
import { Helmet,HelmetProvider } from "react-helmet-async";
import { NavLink,useNavigate } from "react-router-dom";
import { AuthActions } from "../../store/authSlice";
import { isEmailValid } from "../gen/loginRegValidations";
import axios from "axios";

export function GuestLogin(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formvalues,setFormValues]=useState({
        email:'',
        password:''
    });
    const [formErrors,setFormErrors]=useState();

    const handleDismiss = () => {
        setFormErrors(null);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        // post this data
            console.log("im here");
            if (!isEmailValid(formvalues.email)) {
                console.log('Invalid email');
                return;
            }

            try {
                
                    const response = await axios.post('http://localhost:5050/guest/login', {
                    formvalues
                    });

                    console.log(response);
            
                    if (response.data.exists) {
                    // The username exists
                    console.log('email exists');
                    if(response.data.auth){
                        dispatch(AuthActions.login(formvalues));
                        navigate("/guest/startingPage");
            
                    }
                    else{
                        // LOGIN FAIL:PASSINCORRECT
                        console.log(response.data.error);
                        setFormErrors(response.data.error);

                    }
                    } else {
                    // The username does not exist
                    // LOGIN FAIL:USERNAME DOESNT EXIST
                        console.log(response.data.error);
                        setFormErrors(response.data.error);
                    }
                
        
                    console.log("response:", response.data); // Log the response data
                // }
            } 
            catch (error) {
                console.error('Error making the request:', error);
                setFormErrors(error);
            }

            
        };

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

                                    <form onSubmit={submitHandler}>

                                    <div className="d-flex align-items-center mb-3 pb-1 ">
                                        <span className="h1 fw-bold mb-4">HomeAway (Guest)</span>
                                        {/* {isAuth && <h3>is authed</h3>} */}
                                    </div>

                                    <h5 className="fw-medium mb-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                                    <div className="form-outline mb-4">
                                        <input type="email" className="form-control form-control-md" 
                                        id="email" name="email" placeholder="Email address"
                                        value={formvalues.email}
                                        onChange={e => {setFormValues({...formvalues,email:e.target.value})}} required />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" className="form-control form-control-md" 
                                        id="password" name="password" placeholder="Password" 
                                        value={formvalues.password}
                                        onChange={e => {setFormValues({...formvalues,password:e.target.value})}} required />
                                    </div>

                                    <div className="pt-0 mb-4">
                                        <button className="btn btn-dark btn-md btn-block" type="submit">LOGIN</button>
                                    </div>

                                    <p className="mb-0 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <NavLink to="/guest/register"
                                        style={{color: '#393f81'}}>Register here</NavLink></p>
                                    {formErrors && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {formErrors}
                                            <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>}
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