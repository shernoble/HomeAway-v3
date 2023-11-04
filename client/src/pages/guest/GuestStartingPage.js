
import { useState,useEffect } from "react"
// import "../assets/css/startingPage.css"
import { Helmet,HelmetProvider } from "react-helmet-async";

export function GuestStartingPage(){

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
                        <div className="form-group">
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
                        </div>
                        <button type="submit" 
                        className="btn btn-1">Submit</button>
                        <a href="/guest/homepagefull" className="btn btn-2">Skip</a>
                    </form>
        </div>
        </HelmetProvider>
    )

}