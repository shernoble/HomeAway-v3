
import { useState,useEffect } from "react"
// import {NavLink}
// import "../assets/css/startingPage.css"
import { Helmet,HelmetProvider } from "react-helmet-async";

export function GuestLogin(){

    // usestate
    // const [numguests,setNumGuests]=useState(2);
    
    const [formvalues,setFormValues]=useState({
        location:"Bangalore",
        guests:2,
        fromDate:"",
        toDate:""
    });
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setisSubmit]=useState(false);

    

    const handleChange = (e) => {
        const {name,value}=e.target;
        console.log("name:"+name+" val:"+value);
        setFormValues({...formvalues,[name]:value});
    }

    function handleSubmit(e){
        e.preventDefault();
        setFormErrors(validateForm(formvalues));
        setisSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formvalues);
        }

    },[formErrors, formvalues, isSubmit])

    const validateForm =(values) => {

        const errors={};
        console.log("numguests:"+values.numguests);
        const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=new Date(values.fromDate).getTime();
        const end_time=new Date(values.toDate).getTime();
        const num_guests=values.numguests;

        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            errors.dates='invalid dates';
        }
        let num_days=(end_time-start_time)/(1000*60*60*24);
        
        console.log("duration:"+num_days);
        if(num_guests>20){
            errors.numguests='max number of guests is 20';
        }
        if(num_days>10){
            errors.dates='duration of stay cannot be more than 10 days';
    
        }
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

                                <form>

                                <div className="d-flex align-items-center mb-3 pb-1 ">
                                    <span className="h1 fw-bold mb-4">Home Away (Admin)</span>
                                </div>

                                <h5 className="fw-medium mb-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                                <div className="form-outline mb-4">
                                    <input type="email" className="form-control form-control-md" id="email" name="email" placeholder="Email address" required />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" className="form-control form-control-md" id="password" name="password" placeholder="Password" required />
                                </div>

                                <div className="pt-0 mb-4">
                                    <button className="btn btn-dark btn-md btn-block" type="submit">LOGIN</button>
                                </div>

                                <p className="mb-0 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/admin/register"
                                    style={{color: '#393f81'}}>Register here</a></p>
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