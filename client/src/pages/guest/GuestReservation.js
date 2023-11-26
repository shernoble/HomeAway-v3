import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { reserveValidation } from '../../js/loginRegValidations';
import { guestResultsActions } from '../../store/guestResults';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";

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
            // console.log(alertRef.current);
            // if (alertRef.current) {
            //     console.log('Scrolling...');
            //     window.scrollTo({
            //         top: alertRef.current.offsetTop,
            //         behavior: 'smooth',
            //     });
            // }
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
            </Helmet>
        }
        <GuestHeader />
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

        <div className="description">
            <form onSubmit={handleSubmit} className="form-group">
            {listing && (
                <div className="desc desc-pricing">
                <h3>Booking</h3>
                <input
                    className="form-control"
                    type="date"
                    placeholder="check-in"
                    name="checkin"
                    id="checkin"
                    required
                    value={formValues.fromDate}
                    onChange={(e) => setFormValues({ ...formValues, fromDate: e.target.value })}
                />
                <input
                    className="form-control"
                    type="date"
                    placeholder="check-out"
                    name="checkout"
                    id="checkout"
                    required
                    value={formValues.toDate}
                    onChange={(e) => setFormValues({ ...formValues, toDate: e.target.value })}
                />
                <p>Cost Per Night : {listing.CostPerN}</p>
                <button type="submit" className="reserve-button btn btn-outline-dark">Reserve Stay</button>
                </div>
            )}
            </form>

            {listing && listing.Address && (
            <div className="desc desc-content">
                <h4 className="address_title">Address:</h4>
                <p>{listing.Address.Line1}</p>
                <p>{listing.Address.Line2}, {listing.Address.District}, {listing.Address.Pincode}</p>
                <h4>Here's a little about our place!</h4>
                <p>{listing.Desc1}</p>
                <p>{listing.Desc2}</p>
            </div>
            )}

            <div className="desc desc_facilities"></div>
        </div>
        </HelmetProvider>
    );
}
