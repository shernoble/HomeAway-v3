import React from 'react';
// import { useParams } from 'react-router-dom';
// import './GuestConfirmation.css'; // Import your CSS file
import { useSelector } from 'react-redux';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import { GuestHeader } from "../../components/guestHeader/GuestHeader";

export function GuestConfirmation(){
    // const { startDate, endDate } = useParams();
    const listing=useSelector(state => state.guestSearch.reservation.listing);
    const checkin=new Date(useSelector(state => state.guestSearch.reservation.fromDate));
    const checkout=new Date(useSelector(state => state.guestSearch.reservation.toDate));

    const num_days=Math.ceil(Math.abs(checkout-checkin)/(24*60*60*1000));
    // send to backend
    // check if number of days valid
    // check if days available



    const handleConfirmation=async() => {
        // Implement your booking confirmation logic here
        // event.preventDefault();
        // post to backend-check availability
        // have to send curr guest id as well
        const bookingMessage=document.getElementById('booking-message');
        const confetti=document.getElementsByClassName('cp');
        const confDiv=document.getElementById('conf');
        const response=await axios.post("http://localhost:5050/guest/confirmBooking",{listing,checkin,checkout});
        console.log("response:"+response.data);
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
            
        } else {
            bookingMessage.classList.remove('alert-success');
            bookingMessage.classList.add('alert-danger');
            bookingMessage.innerHTML = 'Booking failed. Please try again.';
        }
    
        console.log('Booking confirmed!');
    };

    return (
        <HelmetProvider>
        
        {
            <Helmet>
                <link rel="stylesheet" href="/css/guest-confirmation.css" />
            </Helmet>
        }
        <GuestHeader />
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
        <div className="ccl" style={{ height: '150px' }}>
            <h5>Cancellation policy</h5>
            <ul>
            <li>To receive a full refund, guests must cancel at least 30 days before check-in</li>
            <li>If guests cancel between 7 and 30 days before check-in, host gets paid 50% for all nights</li>
            <li>If guests cancel less than 7 days before check-in, host gets paid 100% for all nights</li>
            <li>Guests can also receive a full refund if they cancel within 48 hours of booking, if the cancellation occurs at least 14 days before check-in</li>
            </ul>
        </div>
        <div className="payment">
            <h5>Payment Summary</h5>
            <table className="table1 table table-bordered">
            <thead className="thead-dark">
                <tr>
                <th scope="col" className="heading1">
                    Details
                </th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>number of nights</td>
                <td>{num_days}</td>
                </tr>
                <tr>
                <td>cost per night</td>
                <td>{listing.CostPerN}</td>
                </tr>
                <tr>
                <td>taxes</td>
                <td>5%</td>
                </tr>
                <tr>
                <td>total cost (rupees) </td>
                <td>{num_days * listing.CostPerN + (num_days * listing.CostPerN * 0.05)}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="buttons-container">
            
            <button type="button" id="confirmBtn" className="confbtn btn btn-outline-success" onClick={handleConfirmation}>
                Confirm Booking
            </button>

            <button className="cancelbtn btn btn-outline-dark" onClick={() => window.history.back()} name="go_back">
            Cancel
            </button>
        </div>
        </HelmetProvider>
    );
};


