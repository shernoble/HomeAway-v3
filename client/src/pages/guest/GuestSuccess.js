

import { useEffect,useState } from 'react';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
// import { Footer } from '../../components/Footer/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { Footer } from '../../components/Footer2/GFooter';
import axios from 'axios';

import { HelmetProvider,Helmet } from 'react-helmet-async';
import { Loading } from '../../components/Loading/Loading';

export function Success (){
    const [isLoading, setIsLoading] = useState(true);

    const listing=useSelector(state => state.guestSearch.listing);
    const checkin=new Date(useSelector(state => state.guestSearch.fromDate));
    const checkout=new Date(useSelector(state => state.guestSearch.toDate));
    const user=useSelector(state => state.auth.user);

    console.log("fromDate : ");
    console.log(checkin);

    const handleConfirmation = async () => {
        try {
            const bookingMessage = document.getElementById('booking-message');
            const confetti = document.getElementsByClassName('cp');
            const confDiv = document.getElementById('conf');
    
            // Send a POST request to confirm booking
            const response = await axios.post("http://localhost:5050/guest/confirmBooking", { listing, checkin, checkout, user });
    
            // Check if the response indicates success
            if (response.data && response.data.success) {
                // Booking successful
                bookingMessage.classList.remove('alert-danger');
                bookingMessage.classList.add('alert-success');
                bookingMessage.innerHTML = 'Booking successful!';
                confDiv.classList.add('confetti');
                for (let i = 0; i < confetti.length; i++) {
                    confetti[i].classList.add('confetti-piece');
                }
                setTimeout(function () {
                    for (let i = 0; i < confetti.length; i++) {
                        confetti[i].classList.remove('confetti-piece');
                    }
                    confDiv.classList.remove('confetti');
                }, 3000);
                console.log('Booking confirmed!');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else {
                // Booking failed
                bookingMessage.classList.remove('alert-success');
                bookingMessage.classList.add('alert-danger');
                bookingMessage.innerHTML = response.data.err || 'Booking failed';
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error confirming booking:', error);
            const bookingMessage = document.getElementById('booking-message');
            bookingMessage.classList.remove('alert-success');
            bookingMessage.classList.add('alert-danger');
            bookingMessage.innerHTML = 'An error occurred while confirming booking';
        }
    };
    

    useEffect(() => {
        // Simulate loading for 2 seconds, then set isLoading to false
        handleConfirmation();
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
            <link rel="stylesheet" href="/css/guest-confirmation.css" />
                <title>EditPassword-Guest</title>
            </Helmet>
            <GuestHeader/>
            <GuestNav/>
            <div id="conf">
                {[...Array(14)].map((_, index) => (
                <div key={index} className="cp"></div>
                ))}
            </div>
            <div className="alert" id="booking-message"></div>
            {isLoading ? (
                // Show Loading while loading
                <Loading />
            ) : (
                // Once loading is finished, render the password change form
                <h3>OMGGGG SUCCESSS!!!</h3>
            )}<Footer/>
        </HelmetProvider>
    );
};

