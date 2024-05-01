import React from 'react';
// import { useParams } from 'react-router-dom';
// import './GuestConfirmation.css'; // Import your CSS file
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
// import { AuthActions } from '../../store/authSlice';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { Footer } from '../../components/Footer2/GFooter';
import { ListingDetails } from '../../components/ListingDetails/ListingDetails';
// import { Checkout } from '../../components/CheckoutModal/Checkout';
// import { Footer } from '../../components/Footer/Footer';

import { loadStripe } from '@stripe/stripe-js';

export function GuestConfirmation(){
    // const { startDate, endDate } = useParams();
    // const dispatch=useDispatch();
    // const navigate=useNavigate();
    const listing=useSelector(state => state.guestSearch.listing);
    const checkin=new Date(useSelector(state => state.guestSearch.fromDate));
    const checkout=new Date(useSelector(state => state.guestSearch.toDate));
    const user=useSelector(state => state.auth.user);
    const PUBLISHABLE_KEY='pk_test_51PAY0ySI0FjRDwYQ8RlYKPxqO23bHS8pB6JgWQCRcCSu9ro6f4s6WDGLby28svA8xF35zOLBOzp9ZBeI5uHjkLqx00agN2Ofkv';
    
    console.log("");
    console.log(listing);

    const [showModal, setShowModal] = useState(false);

    const num_days=Math.ceil(Math.abs(checkout-checkin)/(24*60*60*1000));

    let {success} =useParams();

    success=success || false;

    const handleConfirmation=async() => {
        setShowModal(false);
        const bookingMessage=document.getElementById('booking-message');
        const confetti=document.getElementsByClassName('cp');
        const confDiv=document.getElementById('conf');
        const response=await axios.post("http://localhost:5050/guest/confirmBooking",{listing,checkin,checkout,user});
        console.log(response.data.booking);
        if (response.data.success) {
            // Booking successful
            bookingMessage.classList.remove('alert-danger');
            bookingMessage.classList.add('alert-success');
            bookingMessage.innerHTML = 'Booking successful!';
            confDiv.classList.add('confetti');
            for(let i=0;i<confetti.length;i++){
                confetti[i].classList.add('confetti-piece');
            }
            setTimeout(function () {
                for(let i=0;i<confetti.length;i++){
                    confetti[i].classList.remove('confetti-piece');
                }
                confDiv.classList.remove('confetti');
            }, 3000);
            console.log('Booking confirmed!');
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            // const booking=response.data.booking;
            // console.log(booking);
            // dispatch(AuthActions.addBooking({
            //     BookingId:booking._id,
            //     checkin:new Date(booking.fromDate),
            //     checkout:new Date(booking.toDate)
            // }));
        } else {
            bookingMessage.classList.remove('alert-success');
            bookingMessage.classList.add('alert-danger');
            bookingMessage.innerHTML = response.data.err;
        }
    
    };
    // const handleConfirmation=async() => {
    //     navigate('/guest/payment');
    // }
    if(success){
        // handleConfirmation();
        console.log("hi");
    }

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };

    const makePayment = async()=>{
        try{
            const stripe = await loadStripe(PUBLISHABLE_KEY);

            const body = {
                listing:listing,
                num_days:num_days
            }
            const headers = {
                "Content-Type":"application/json"
            }
            const response = await fetch("http://localhost:5050/guest/create-checkout-session",{
                method:"POST",
                headers:headers,
                body:JSON.stringify(body)
            });
            const session = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId:session.id
            });
            
            if(result.error){
                console.log(result.error);
            }
        }
        catch(error){
            console.error('Error making payment:', error);
        }

        
        // else{
        //     handleConfirmation();
        // }
    }

    return (
        <HelmetProvider>
        
        {
            <Helmet>
                <link rel="stylesheet" href="/css/guest-confirmation.css" />
                <title>Guest-Confirmation</title>
            </Helmet>
        }
        <GuestHeader />
        <GuestNav/>
        <div id="conf">
            {[...Array(14)].map((_, index) => (
            <div key={index} className="cp"></div>
            ))}
        </div>
        <div className="alert" id="booking-message"></div>
        <div className="go-back-btn">
            <button className="btn btn-outline-dark" onClick={() => window.history.back()}>
            Go Back
            </button>
        </div>
        <div className="summary-1">
            <div className="pic" style={{ backgroundImage: `url(${listing.img_url1})` }}></div>
            <div className="desc">
            <div className="desc-pos">
                <h4>{listing.Title}</h4>
                <p>
                {listing.Bedrooms} bedrooms, {listing.Bathrooms} bathrooms
                </p>
                <p>{listing.Address.Line1},</p>
                <p>{listing.Address.Line2}</p>
                <p>
                {listing.Address.District}, {listing.Address.Pincode}, {listing.Address.State}
                </p>
            </div>
            </div>
        </div>
        
        <div >
            <ListingDetails
                num_days={num_days}
                listing={listing}
            />
        </div>
        
        <div className="buttons-container">
            
            {/* <button type="button" id="confirmBtn" className="confbtn btn btn-outline-success" onClick={() => setShowModal(true)}>
                Make Payment
            </button> */}
            <button type="button" id="confirmBtn" className="confbtn btn btn-outline-success" onClick={makePayment}>
                Make Payment
            </button>

            {/* <button
                className="delete-button btn btn-danger"
                onClick={() => handleShowModal(element.UserName, element._id)}
            ></button> */}

            <button className="cancelbtn btn btn-outline-dark" onClick={() => window.history.back()} name="go_back">
            Cancel
            </button>
        </div>
        {/* <Checkout
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirmation={handleConfirmation}
            listing={listing}
            num_days={num_days}
        /> */}
        <Footer/>
        </HelmetProvider>
    );
};


