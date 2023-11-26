// ProfileCard.js
import React from 'react';

export function ProfileCard({ user }) {
    return (
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
        </div>
    );
}

