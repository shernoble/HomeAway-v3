import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { reserveValidation } from '../../js/loginRegValidations';
import { guestResultsActions } from '../../store/guestResults';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import {Footer} from "../../components/Footer2/GFooter";
import { HouseRentalRules } from '../../components/HouseRules/HouseRules';
import { GuestNav } from '../../components/guestNavbar/GuestNav';

export function GuestReservation() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const response = useSelector(state => state.guestSearch.response);
    const [formValues, setFormValues] = useState({
        fromDate: response ? response.fromDate : '',
        toDate: response ? response.toDate : '',
    });
    const [formErrors,setFormErrors]=useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`http://localhost:5050/guest/reserve/${id}`)
        .then(result => {
            setListing(result.data);
            setLoading(false); // Set loading to false once data is fetched
        })
        .catch(err => {
            console.log("server error : " + err);
        });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }


    const handleSubmit =async(event) => {
        event.preventDefault();
        const err=reserveValidation(formValues);
        if(err){
            console.log(err);
            setFormErrors(err);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            return;
        }
        // else continue with submission as post
        try{
            // just store in redux store
            dispatch(guestResultsActions.storeReservation({listing:listing,dates:formValues}));
            console.log("success");
            navigate('/guest/confirm');
        }
        catch(err){
            console.log(err);
        }
    }
    const handleDismiss = () => {
        setFormErrors(null);
    }

    return (
        <HelmetProvider>
        {
            <Helmet>
            <link rel="stylesheet" href="/css/guest-reservation.css" />
            <title>Reserve-Guest</title>
            </Helmet>
        }
        <GuestHeader />
        <GuestNav/>
        {formErrors && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {formErrors}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        <div className="container p-4">
            <div className="row">
            {listing && listing.Address && (
                <>
                <div className="col-md-8">
                    <h3>{listing.Title}</h3>
                    <p>
                    <span className="rooms">{listing.Bedrooms} bedrooms, {listing.Bathrooms} bathrooms</span>
                    <span className="location">{listing.Address.District}, {listing.Address.State} India</span>
                    </p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end">
                    <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                </>
            )}
            </div>
        </div>
        <div className="house-imgs">
            <section className="selected-house">
            {listing && (
                <>
                <div className="image1" style={{ backgroundImage: `url(${listing.img_url1})` }}></div>
                <div className="image1" style={{ backgroundImage: `url(${listing.img_url2})` }}></div>
                <div className="image" style={{ backgroundImage: `url(${listing.img_url3})` }}></div>
                <div className="image" style={{ backgroundImage: `url(${listing.img_url4})` }}></div>
                <div className="image" style={{ backgroundImage: `url(${listing.img_url5})` }}></div>
                </>
            )}
            </section>
        </div>

        
        <div className="container">
            <div className='row'>
                {listing && (
                    <div className="col-lg-3 m-3 card">
                        <div className="card-body " >
                            <h5 className="card-title">Booking</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="checkin" className="form-label">Check-in</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkin"
                                        placeholder="Check-in"
                                        required
                                        value={formValues.fromDate}
                                        onChange={(e) => setFormValues({ ...formValues, fromDate: e.target.value })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="checkout" className="form-label">Check-out</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="checkout"
                                        placeholder="Check-out"
                                        required
                                        value={formValues.toDate}
                                        onChange={(e) => setFormValues({ ...formValues, toDate: e.target.value })}
                                    />
                                </div>
                                <p>Cost Per Night: {listing.CostPerN}</p>
                                <button type="submit" className="btn btn-outline-dark">Reserve Stay</button>
                            </form>
                        </div>
                    </div>
                )}
                <div className='col-lg-8'>
                    <div className=" m-3 card">
                        <div className="card-body h-100" >
                            <h5 style={{ marginBottom: "0" }} className="card-title">Address</h5>
                            <p style={{ marginBottom: "0" }}>{listing.Address.Line1}</p>
                            <p>{listing.Address.Line2}, {listing.Address.District}, {listing.Address.Pincode}</p>
                        </div>
                    </div>

                    <div className="m-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            <p style={{ marginBottom: "0" }}>{listing.Desc1}</p>
                            <p>{listing.Desc2}</p>
                        </div>
                    </div>

                </div>
                
                <div className="col-lg-3 m-3 card">
                    <div className="card-body">
                        <h5 className="card-title">Facilities</h5>
                        <ul>
                            {listing.Facilities.map((facility, index) => {
                                if (facility === 'wi-fi') {
                                    return <li key={index}><i className="fa-solid fa-wifi"></i></li>;
                                }
                                if (facility === 'TV') {
                                    return <li key={index}><i className="fa-solid fa-tv"></i></li>;
                                }
                                if (facility === 'ac') {
                                    return <li key={index}>AC</li>;
                                }
                                if (facility === 'parking') {
                                    return <li key={index}><i className="fa-solid fa-square-parking"></i></li>;
                                }
                                if (facility === 'pool') {
                                    return <li key={index}><i className="fa-solid fa-water-ladder"></i></li>;
                                }
                                return null; // Return null for facilities other than 'wifi'
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-8 m-3 card">
                    <div className="card-body">
                        <h5 className="card-title" style={{textDecoration:'underline'}}>House Rules</h5>
                        <HouseRentalRules/>
                        <h5 className="card-title" style={{textDecoration:'underline'}}>Ratings and Reviews</h5>
                    </div>
                </div>
                
            </div>
        </div>
{/* // ... (remaining code) */}

        <Footer/>
        </HelmetProvider>
    );
}
