// PasswordChangeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { validPasswords } from '../../js/loginRegValidations';

export function PasswordChangeForm({ user, endpoint }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const errors = validPasswords(newPassword, confirmPassword);
        if (errors) {
            setMessage(errors);
            clearForm();
            return;
        }

        try {
            const response = await axios.post(endpoint, {
                id: user._id,
                newPassword,
                oldPassword,
            });

            handleResponse(response.data);
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('An error occurred while changing the password.');
            clearForm();
        }
    };

    const clearForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleResponse = (data) => {
        if (data.success) {
            setMessage('Password changed successfully.');
            clearForm();
        } else {
            setMessage(data.message);
            clearForm();
        }
    };

    return (
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
            {message && (
                <div className={`mt-3 alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
            )}
        </div>
    );
}

