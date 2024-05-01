import React, { useState } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { ProfileCard } from '../../components/profileCard/ProfileCard';
import { Footer } from '../../components/Footer2/GFooter';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { Loading } from '../../components/Loading/Loading';
import {BookingDetailsModal} from "../../components/BookingModal/BookingsModal"; // Import the modal component
import { guestBookingActions } from '../../store/guestBookingSlice';

export function GuestProfile() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null); // State variable for selected booking
    const user = useSelector(state => state.auth.user);
    // const booking=useSelector(state => state.booking.booking);
    // const bookings = user.Bookings;
    const [bookings,setBookings]=useState([]);
    const [iscurr,setiscurr]=useState(false);

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000);

        // return () => clearTimeout(timer); // Cleanup on unmount
        axios.get("http://localhost:5050/guest/getBookings",{ params: { user_id: "64ff40bbedb5d102901fa6f9" } })
        .then((response) => {
            setBookings(response.data.bookings);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleOpenModal = (booking) => {
        console.log("booking : ");
        console.log(booking);
        setSelectedBooking(booking);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const handleClick=() => {
        // go to new page-there give all options along with booking details
        dispatch(guestBookingActions.bookingInfo(selectedBooking));
        navigate(`/guest/bookingdetails/${iscurr}/${selectedBooking.Status}`);
    }

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
                <title>Profile-Guest</title>
            </Helmet>
            <GuestHeader />
            <GuestNav/>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <ProfileCard user={user} />
                            </div>
                            <div className="col-md-6">
                                <div className="profile-card">
                                    <h3> Bookings:</h3>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Booking ID</th>
                                                <th scope="col">From Date</th>
                                                <th scope="col">To Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings && bookings.map((element) => {
                                                const date1 = new Date(element.FromDate);
                                                const date2 = new Date(element.ToDate);

                                                // Check if the dates are valid
                                                if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
                                                    return null; // Skip rendering if the dates are invalid
                                                }

                                                const currentDate = new Date();
                                                const new1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')}`;
                                                const new2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;

                                                if (date2 < currentDate) {
                                                    return (
                                                        <tr key={element._id} onClick={() => {
                                                            setiscurr(false);
                                                            handleOpenModal(element)}}>
                                                            <td>{element._id}</td>
                                                            <td>{new1}</td>
                                                            <td>{new2}</td>
                                                        </tr>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-card">
                                    <h3> Current Bookings:</h3>
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Booking ID</th>
                                                <th scope="col">From Date</th>
                                                <th scope="col">To Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings && bookings.map((element) => {
                                                const date1 = new Date(element.FromDate);
                                                const date2 = new Date(element.ToDate);

                                                // Check if the dates are valid
                                                if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
                                                    return null; // Skip rendering if the dates are invalid
                                                }

                                                const currentDate = new Date();
                                                const new1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')}`;
                                                const new2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;

                                                if (date1 >= currentDate) {
                                                    return (
                                                        <tr key={element._id} onClick={() => {
                                                            setiscurr(true)
                                                            handleOpenModal(element)}}>
                                                            <td>{element._id}</td>
                                                            <td>{new1}</td>
                                                            <td>{new2}</td>
                                                        </tr>
                                                    );
                                                }

                                                return null;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center mt-3">
                                <Link to="/guest/editPass" className="btn btn-outline-danger">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                    {/* Render modal component with selected booking */}
                    {selectedBooking && (
                        <BookingDetailsModal
                            booking={selectedBooking}
                            onClose={handleCloseModal}
                            iscurr={iscurr}
                            handleClick={handleClick}
                            status={selectedBooking.Status}
                        />
                    )}
                </>
            )}
        </HelmetProvider>
    );
}

