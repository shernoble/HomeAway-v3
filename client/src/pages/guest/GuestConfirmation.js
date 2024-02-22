import React from 'react';
// import { useParams } from 'react-router-dom';
// import './GuestConfirmation.css'; // Import your CSS file
import { useSelector,useDispatch } from 'react-redux';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
// import { AuthActions } from '../../store/authSlice';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { Footer } from '../../components/Footer2/GFooter';
import { ListingDetails } from '../../components/ListingDetails/ListingDetails';
// import { Footer } from '../../components/Footer/Footer';

export function GuestConfirmation(){
    // const { startDate, endDate } = useParams();
    // const dispatch=useDispatch();

    const listing=useSelector(state => state.guestSearch.reservation.listing);
    const checkin=new Date(useSelector(state => state.guestSearch.reservation.fromDate));
    const checkout=new Date(useSelector(state => state.guestSearch.reservation.toDate));
    const user=useSelector(state => state.auth.user);

    const num_days=Math.ceil(Math.abs(checkout-checkin)/(24*60*60*1000));

    const handleConfirmation=async() => {
        const bookingMessage=document.getElementById('booking-message');
        const confetti=document.getElementsByClassName('cp');
        const confDiv=document.getElementById('conf');
        const response=await axios.post("http://localhost:5050/guest/confirmBooking",{listing,checkin,checkout,user});
        console.log(response.data);
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
            
            <button type="button" id="confirmBtn" className="confbtn btn btn-outline-success" onClick={handleConfirmation}>
                Confirm Booking
            </button>

            <button className="cancelbtn btn btn-outline-dark" onClick={() => window.history.back()} name="go_back">
            Cancel
            </button>
        </div>
        <Footer/>
        </HelmetProvider>
    );
};


