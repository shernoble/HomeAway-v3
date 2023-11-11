
import { useState,useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import Alert from "@mui/material";
// import "../assets/css/startingPage.css"
import { Helmet,HelmetProvider } from "react-helmet-async";
import { NavLink,useNavigate } from "react-router-dom";
// import { useDispatch,useSelector } from "react-redux";
// import { userActions } from "../../store/userSlice";
import { AuthActions } from "../../store/authSlice";
import { isEmailValid } from "../gen/loginRegValidations";
import axios from "axios";

export function AdminLogin(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const curr_user=useSelector(state => state.auth.user);
    console.log("user : "+curr_user);
    const [formvalues,setFormValues]=useState({
        email:'',
        password:''
    });
    // const [formErrors,setFormErrors]=useState({});

    const submitHandler = async (event) => {
        event.preventDefault();
        // post this data

            if (!isEmailValid(formvalues.email)) {
                console.log('Invalid email');
                // dispatch(AuthActions.loginFalse());
                return;
            }

            try {
                
                    const response = await axios.post('/admin/login', {
                    formvalues
                    });
            
                    if (response.data.exists) {
                    // The username exists
                    console.log('email exists');
                    if(response.data.auth){
                        // console.log("password match");
                        // LOGIN SUCCESS
                        dispatch(AuthActions.loginSuccess(formvalues));
                        navigate("/admin/guestList");
            
                    }
                    else{
                        // LOGIN FAIL:PASSINCORRECT
                        console.log(response.data.error);

                        // dispatch(AuthActions.loginFalse({user:formvalues,error:response.data.error}));
                    }
                    } else {
                    // The username does not exist
                    // LOGIN FAIL:USERNAME DOESNT EXIST
                    console.log(response.data.error);
                    // dispatch(AuthActions.loginFalse({user:formvalues,error:response.data.error}));
                    }
                
        
                    console.log("response:", response.data); // Log the response data
                // }
            } 
            catch (error) {
                console.error('Error making the request:', error);
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
                                <img src="/imgs/56.jpg"
                                    alt="login form" className="img-fluid h-125" style={{borderRadius: '1rem 1rem 1rem 1rem'}}/>
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex ">
                                <div className="card-body p-4 p-lg-4 text-black">

                                    <form onSubmit={submitHandler}>

                                    <div className="d-flex align-items-center mb-3 pb-1 ">
                                        <span className="h1 fw-bold mb-4">Home Away (Admin)</span>
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

                                    <p className="mb-0 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <NavLink to="/admin/register"
                                        style={{color: '#393f81'}}>Register here</NavLink></p>
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