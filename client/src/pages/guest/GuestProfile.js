import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    // const [profile, setProfile] = useState({});
    // const [bookings, setBookings] = useState([]);
    // get profile from store
    const user=useSelector(state => state.auth.user);
    // get bookings from main bookings list
    // first auth the user on diff pages
    const bookings={};

    useEffect(() => {
        // Fetch user profile and bookings data here
        // For example, you can use the Fetch API or any other method to get the data

        // Example:
        // fetch('/api/profile') 
        //   .then(response => response.json())
        //   .then(data => setProfile(data.profile))
        //   .catch(error => console.error('Error fetching profile:', error));

        // fetch('/api/bookings')
        //   .then(response => response.json())
        //   .then(data => setBookings(data.bookings))
        //   .catch(error => console.error('Error fetching bookings:', error));
    }, []); // Empty dependency array ensures the useEffect runs only once (on mount)

    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
            <div className="profile-card">
                <h1>User Profile</h1>
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" className="form-control" value={user.UserName} readOnly />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" className="form-control" value={user.Email} readOnly />
                </div>
                <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" className="form-control" value={user.PhoneNumber} readOnly />
                </div>
                <h3>Bookings:</h3>
                <ul id="bookings" className="list-group">
                {/* Bookings will be dynamically added here using JavaScript */}
                {bookings.map((element) => {
                    const date1 = new Date(element.FromDate);
                    const date2 = new Date(element.ToDate);
                    const new1 = `${date1.getFullYear()}-${String(date1.getMonth() + 1).padStart(2, '0')}-${String(date1.getDate()).padStart(2, '0')}`;
                    const new2 = `${date2.getFullYear()}-${String(date2.getMonth() + 1).padStart(2, '0')}-${String(date2.getDate()).padStart(2, '0')}`;
                    return (
                    <li key={element.id} className="list-group-item">
                        from: {new1} to: {new2}
                    </li>
                    );
                })}
                </ul>
            </div>
            </div>
        </div>
        </div>
    );
};

export default UserProfile;
