
import { useState } from "react"
import {useDispatch} from "react-redux"
import { Helmet,HelmetProvider } from "react-helmet-async";
import { NavLink,useNavigate} from "react-router-dom";
import { AuthActions } from "../../store/authSlice";
import { validRegisteration } from "../gen/loginRegValidations";

import axios from "axios";

export function AdminRegister(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [formvalues,setFormValues]=useState({
        username:'',
        email:'',
        phone:'',
        password:'',
        cpassword:'',
    });

    const [formErrors,setFormErrors]=useState();

    const handleDismiss = () => {
        setFormErrors(null);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const validationError = validRegisteration(formvalues);

        if (validationError) {
            // alert(validationError);
            console.log(validationError);
            return ;
        }
        // post this data
            try {

                const response = await axios.post('/admin/register', {
                formvalues
                });
        
                if (response.data.exists) {
                // The email exists
                    // dispatch(AuthActions.registerFalse({error:'email already in use'}));
                    console.log("email already in use");
                    setFormErrors("email already in use");
                } else {
                // registersation SUCCESS
                // console.log(response.data.error);
                dispatch(AuthActions.login(formvalues));
                navigate("/admin/guestlist");
                }
        
                console.log("response:", response.data); // Log the response data
            } catch (error) {
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
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-grid d-md-block">
                            <img
                                src="/imgs/56.jpg"
                                alt="login form"
                                className="img-fluid h-75"
                                style={{ borderRadius: '1rem 1rem 1rem 1rem' }}
                            />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex">
                            <div className="card-body p-4 p-lg-4 text-black">
                                <form onSubmit={submitHandler}>
                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <h1 className="fw-bold mb-4">Home Away (Admin)</h1>
                                </div>
                                <h5 className="fw-medium mb-4 pb-3" style={{ letterSpacing: '1px' }}>
                                    Sign up your account
                                </h5>
                                <div className="form-outline mb-4">
                                    <input
                                    type="text" className="form-control form-control-md"
                                    id="username" name="username"
                                    placeholder="Enter your username" 
                                    value={formvalues.username}
                                    onChange={e => setFormValues({...formvalues,username:e.target.value})}
                                    required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                    type="email"
                                    className="form-control form-control-md" id="email"
                                    name="email" placeholder="Email address"
                                    value={formvalues.email}
                                    onChange={e => setFormValues({...formvalues,email:e.target.value})}
                                    required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                    type="text"
                                    className="form-control form-control-md"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formvalues.phone}
                                    onChange={e => setFormValues({...formvalues,phone:e.target.value})}
                                    required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                    type="password"
                                    className="form-control form-control-md"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formvalues.password}
                                    onChange={e => setFormValues({...formvalues,password:e.target.value})}
                                    required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                    type="password"
                                    className="form-control form-control-md"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formvalues.cpassword}
                                    onChange={e => setFormValues({...formvalues,cpassword:e.target.value})}
                                    required
                                    />
                                </div>
                                <div className="pt-0 mb-4">
                                    <button className="btn btn-dark btn-md btn-block" type="submit">
                                    SIGNUP
                                    </button>
                                </div>
                                <p className="mb-0 pb-lg-2" style={{ color: '#393f81' }}>
                                    Already have an account?{' '}
                                    <NavLink to="/admin/login" style={{ color: '#393f81' }}>
                                    Login
                                    </NavLink>
                                </p>
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

