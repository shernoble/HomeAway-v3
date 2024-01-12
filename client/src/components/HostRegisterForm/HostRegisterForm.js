
import { useState } from "react"
import { Helmet,HelmetProvider } from "react-helmet-async";
import { useNavigate,Link} from "react-router-dom";
import { validRegisteration } from "../../js/loginRegValidations";


export function HostRegisterForm({title,picno}){
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
            setFormErrors(validationError);
            return ;
        }
            navigate('/host/p1h');
            
        };

    return (
        <HelmetProvider>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/guest-login.css" />
                </Helmet>
            }
            <body>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-grid d-md-block">
                            <img
                                src={picno}
                                alt="login form"
                                className="img-fluid h-100"
                                style={{ borderRadius: '1rem 0 0 1rem' }}
                            />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex">
                            <div className="card-body p-4 p-lg-4 text-black">
                                <form onSubmit={submitHandler}>
                                <div className="d-flex align-items-center mb-3 pb-1">
                                    <h1 className="fw-bold mb-4">{title}</h1>
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
                                    <Link to="/host/login" style={{ color: '#393f81' }}>
                                    Login
                                    </Link>
                                </p>
                                <Link to="/" className="btn btn-outline-success" style={{ float: 'right', marginTop: '20px' }}>
                                        FrontPage
                                </Link>
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
                </body>
        </HelmetProvider>
    )

}

