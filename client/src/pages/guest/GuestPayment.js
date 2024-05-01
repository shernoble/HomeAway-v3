import React, { useState } from 'react';

import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { Footer } from '../../components/Footer2/GFooter';

export function Checkout() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <>
        <GuestHeader/>
        <div className="container">
        <h1 className="mb-4">Checkout</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="fullName" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea className="form-control" id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
            <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            </div>
            <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input type="text" className="form-control" id="expiryDate" placeholder="MM/YYYY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            </div>
            <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input type="text" className="form-control" id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Place Order</button>
        </form>
        </div>
        <Footer/>
        </>
    );
    }

