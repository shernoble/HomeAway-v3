import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { ProfileCard } from '../../components/profileCard/ProfileCard';
import { Footer } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

export function GuestProfile() {
    const user = useSelector(state => state.auth.user);
    const bookings = user.Bookings;

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/profile.css" />
                <title>Profile-Guest</title>
            </Helmet>
            <GuestHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <ProfileCard user={user} />
                    </div>
                    <div className="col-md-6">
                        <div className="profile-card">
                            <h3>Bookings:</h3>
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

                                        const new1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')}`;
                                        const new2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;

                                        return (
                                            <tr key={element._id}>
                                                <td>{element._id}</td>
                                                <td>{new1}</td>
                                                <td>{new2}</td>
                                            </tr>
                                        );
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
            {/* <Footer/> */}
        </HelmetProvider>
    );
}
