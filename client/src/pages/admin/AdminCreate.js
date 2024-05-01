import React, { useState } from 'react';
import axios from "axios";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Footer } from '../../components/Footer2/GFooter';
// import { useSelector } from 'react-redux';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

export function RegistrationForm() {
    const [userType,setuserType]=useState('guest');
    const [formvalues, setformvalues] = useState({
        // userType: 'guest',
        username: '',
        email: '',
        password: '',
        cpassword: '',
        phone: ''
    });
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let route;
        try {

            if (userType === 'guest') {
                route = "http://localhost:5050/guest/register"; // Route for guest registration
            } else if (userType === 'host') {
                route = "http://localhost:5050/host/register"; // Route for host registration
            }

            const response = await axios.post(route, {
            formvalues
            });
            console.log(response);
    
            if (response.data.exists) {
            // The email exists
                // dispatch(AuthActions.registerFalse({error:'email already in use'}));
                console.log("email already in use");
                setMessage("email already in use");
            } else {
            // registersation SUCCESS
            // console.log(response.data.error);
            // dispatch(AuthActions.login(response.data.user));
            // navigate(navigateLink);
            }
    
            // console.log("response:", response.data); // Log the response data
        } catch (error) {
            console.error('Error making the request:', error);
            setMessage(error);
        }
    }
    

    return (
        <HelmetProvider>
            <Helmet>
                <title>User Registration</title>
            </Helmet>
            <AdminHeader/>
            {/* {message && (
                <div className={`mt-3 alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )} */}
            <div className="container mt-5">
                {/* <div className="row justify-content-center"> */}
                    {/* <div className="col-md-6"> */}
                    <h1 className="text-center">User Registration</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label">Select User Type</label>
                            <select
                                className="form-select"
                                id="userType"
                                name="userType"
                                value={userType}
                                onChange={e => setuserType( e.target.value )}
                            >
                                <option value="guest">Guest</option>
                                <option value="host">Host</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formvalues.username}
                                onChange={e => setformvalues({ ...formvalues, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formvalues.email}
                                onChange={e => setformvalues({ ...formvalues, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formvalues.password}
                                onChange={e => setformvalues({ ...formvalues, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formvalues.confirmPassword}
                                onChange={e => setformvalues({ ...formvalues, cpassword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formvalues.phoneNumber}
                                onChange={e => setformvalues({ ...formvalues, phone: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    {/* </div> */}
                    {/* </div> */}
            </div>
            <Footer />
        </HelmetProvider>
    );
}
