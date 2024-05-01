import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { Footer } from '../../components/Footer2/GFooter';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { Loading } from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { AuthActions } from '../../store/authSlice';

export function GuestBookingDetails() {
    // const dispatch=useDispatch();
    const booking = useSelector(state => state.booking.booking);
    const [listing, setListing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // let user = useSelector(state => state.auth.user);
    const [user, setUser] = useState(null); // Define user state

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility


    let params=useParams();
    let iscurr=params.iscurr;
    let status=params.status;


    useEffect(() => {
        console.log("iscurr:", iscurr); // Log iscurr value to console
        console.log("status : ",status);
        // Rest of your code...
    }, [iscurr,status]); 

    useEffect(() => {
        // Set user state after component mounts
        setUser(localStorage.getItem('user')); // Example: Fetch user from localStorage
    }, []);

    useEffect(() => {
        if (booking) {
            axios.get(`http://localhost:5050/guest/booking/${booking.ListingID}`)
                .then((response) => {
                    console.log(response.data);
                    setListing(response.data.listing);
                    setIsLoading(false); // Set isLoading to false after data is fetched
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false); // Set isLoading to false if there's an error
                });
        }
    }, [booking]); // Fetch data only when booking changes




    const handleCancel = async () => {
        // send to backend
        try {
            if(user)
            {const response = await axios.post("http://localhost:5050/guest/cancelBooking", {
                id: booking._id,
                user:user
            });
            if(!response.data.error){
                // dispatch(guestBookingActions.bookingInfo(selectedBooking));
                // dispatch(AuthActions.login({user:response.data.user,role:"guest"}));
                setUser(response.data.user);
                setAlertMessage('Booking cancelled successfully');
                setShowAlert(true);
            }
            else{
                setAlertMessage('Failed to cancel booking');
                setShowAlert(true);
                console.log(response.data.error);
            }
            // handle the response somehow
            
            console.log(response.data);
        }
        }
        catch (err) {
            setAlertMessage('Failed to cancel booking');
            setShowAlert(true);
            console.log(err);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Booking Details</title>
                </Helmet>
                <GuestHeader />
                <GuestNav />
                {showAlert && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                    </div>
                )}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="content-container" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                        <div className="container mt-4 border border-dark rounded p-3">
                            {listing && (
                                <>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={listing.img_url1} alt={listing.Title} className="img-fluid" style={{ maxHeight: '270px',maxWidth:'350px' }}/>
                                        </div>
                                        <div className="col-md-8">
                                            <h4>{listing.Title}</h4>
                                            <p>{listing.Bedrooms} bedrooms, {listing.Bathrooms} bathrooms</p>
                                            <p>{listing.Address.Line1},</p>
                                            <p>{listing.Address.Line2}</p>
                                            <p>
                                                {listing.Address.District}, {listing.Address.Pincode}, {listing.Address.State}
                                            </p>
                                            <p>Booking time: {listing.createdAt}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5>Cancellation policy</h5>
                                    <ul>
                                        <li>To receive a full refund, guests must cancel at least 30 days before check-in</li>
                                        <li>If guests cancel between 7 and 30 days before check-in, host gets paid 50% for all nights</li>
                                        <li>If guests cancel less than 7 days before check-in, host gets paid 100% for all nights</li>
                                        <li>Guests can also receive a full refund if they cancel within 48 hours of booking, if the cancellation occurs at least 14 days before check-in</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                        {(iscurr==="true" && status!=="cancelled") && <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>}
                        </div>
                        <Link to="/guest/profile" className='btn btn-dark mb-3 ms-3'>Back</Link>
                    </div>
                )}
                <Footer />
            </HelmetProvider>
        </>
    );
}
