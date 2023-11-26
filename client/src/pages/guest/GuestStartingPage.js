
import { useState} from "react"
// import "../assets/css/startingPage.css"
import axios from "axios";
import { useNavigate } from "react-router";
import { Helmet,HelmetProvider } from "react-helmet-async";
import { startingPageValidation } from "../../js/loginRegValidations";
import { guestResultsActions } from "../../store/guestResults";
import { useDispatch} from "react-redux";

export function GuestStartingPage(){

    // usestate
    // const [numguests,setNumGuests]=useState(2);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formvalues,setFormValues]=useState({
        location:"Bangalore",
        guests:2,
        // fromDate:"",
        // toDate:""
    });
    const [formErrors,setFormErrors]=useState();
    // const [isSubmit,setisSubmit]=useState(false);
    // const user=useSelector(state => state.auth.user);
    // console.log("Starting:");
    // console.log(user);

    const handleDismiss = () => {
        setFormErrors(null);
    }

    const handleChange = (e) => {
        const {name,value}=e.target;
        console.log("name:"+name+" val:"+value);
        setFormValues({...formvalues,[name]:value});
    }

    const handleSubmit=async(e) => {
        e.preventDefault();
        const errors=startingPageValidation(formvalues);
        if(errors){
            console.log(errors);
            setFormErrors(errors);
            return;
        }
        try{
            // else
            // handle the submission
            // store the formvalues as a state in store?
            const response = await axios.post('http://localhost:5050/guest/startingPage', {
                    formvalues
                    });
            console.log(response.data);
            dispatch(guestResultsActions.storeResults(response.data));
            navigate('/guest/homePage');

        }
        catch(error){
            setFormErrors(error);
            console.log(error);
        }
    }

    return (
        <HelmetProvider>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/guest-startingPage.css" />
                </Helmet>
            }
            <br />
            <div className="container mt-5">
                <h1 className="mb-4">HomeAway-details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <select className="form-control" id="location" name="location" value={formvalues.location}
                            onChange={handleChange}
                            >
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guests">Number of Guests</label>
                            <input type="number" className="form-control" id="guests" name="guests" min="1" 
                            value={formvalues.guests}
                            onChange={handleChange}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="fromDate">From Date</label>
                            <input type="date" className="form-control" id="fromDate" name="fromDate"
                            value={formvalues.fromDate}
                            onChange={handleChange}
                            required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="toDate">To Date</label>
                            <input type="date" className="form-control" id="toDate" name="toDate"
                            value={formvalues.toDate}
                            onChange={handleChange}
                            required />
                        </div> */}
                        <button type="submit" 
                        className="btn btn-1">Submit</button>
                        <a href="/guest/homepagefull" className="btn btn-2">Skip</a>
                    </form>
                    
            </div>
            {formErrors && <div className="smaller-alert alert alert-danger alert-dismissible fade show" role="alert">
                {formErrors}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </HelmetProvider>
    )

}