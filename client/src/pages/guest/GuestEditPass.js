import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { validPasswords } from '../gen/loginRegValidations';


export function ChangePassword (){
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const user=useSelector(state => state.auth.user);
    const id=user._id;
    const handleChangePassword = async (e) => {
        e.preventDefault();

        const errors=validPasswords(newPassword,confirmPassword);
        if(errors){
            setMessage(errors);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }


        try {
        // Make a request to your API to change the password
        const response = await axios.post('http://localhost:5050/guest/editPass', {
            // user
            id,
            newPassword,
            oldPassword,
        });

        // Handle the response accordingly
        if (response.data.success) {
            setMessage('Password changed successfully.');
            // Clear input values
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage(response.data.message);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        } catch (error) {
        console.error('Error changing password:', error);
        setMessage('An error occurred while changing the password.');
        }
    };

    return (
        <>
        <GuestHeader/>
        <div className="container mt-5">
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
            <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">Old Password:</label>
            <input
                type="password"
                className="form-control"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
            <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
        {message && <div className={`mt-3 alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
        </div>}
        </div>
        </>
    );
};

