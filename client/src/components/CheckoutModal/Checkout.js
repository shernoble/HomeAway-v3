import React, { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
// require('dotenv').config();

export function Checkout({ show, handleClose, handleConfirmation ,listing,num_days}) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const PUBLISHABLE_KEY='pk_test_51PAY0ySI0FjRDwYQ8RlYKPxqO23bHS8pB6JgWQCRcCSu9ro6f4s6WDGLby28svA8xF35zOLBOzp9ZBeI5uHjkLqx00agN2Ofkv';
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const makePayment = async (e) => {
    //     e.preventDefault();
    //     // console.log(process.env.KAVYA);
    //     const stripe=loadStripe(PUBLISHABLE_KEY);
    //     console.log('Form submitted');
    //     // const body={
    //     //     listing:listing,
    //     //     num_days:num_days,
    //     // }
    //     // const headers={
    //     //     'Content-Type':'application/json'
    //     // }
    //     const response = await axios.post('http://localhost:5050/guest/createCheckoutSession',{listing,num_days});

    //     console.log("response : ",response);

    //     // const session=await response.json;
    //     // console.log("session : ",session);

    //     // const result=stripe.redirectToCheckout({
    //     //     sessionId:session.id
    //     // })
    //     // handleConfirmation();
    // };

    const makePayment = async()=>{
        const stripe = await loadStripe(PUBLISHABLE_KEY);

        const body = {
            listing:listing,
            num_days:num_days
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:5050/guest/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }

    const handleSubmit=async(req,res) => {
        const response = await axios.post('http://localhost:5050/guest/createCheckoutSession',{listing,num_days});
    }

    const modalStyle = {
        display: show ? 'block' : 'none',
    };

    return (
        // <div className="container" style={modalStyle}>
        //     <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        //         <div className="modal-dialog" role="document">
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <h5 className="modal-title">Payment</h5>
        //                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
        //                 </div>
        //                 <div className="modal-body">
        //                     {/* <form onSubmit={makePayment}>
        //                         <div className="mb-3">
        //                             <label htmlFor="fullName" className="form-label">Full Name</label>
        //                             <input type="text" className="form-control" id="fullName" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="email" className="form-label">Email Address</label>
        //                             <input type="email" className="form-control" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
        //                             <input type="text" className="form-control" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} required />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
        //                             <input type="text" className="form-control" id="expiryDate" name="expiryDate" placeholder="MM/YYYY" value={formData.expiryDate} onChange={handleChange} required />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="cvv" className="form-label">CVV</label>
        //                             <input type="text" className="form-control" id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
        //                         </div>
        //                         <button type="submit" className="btn btn-primary">Confirm Payment</button>
        //                     </form> */}
        //                     <h3>Welcome to Payment Gateway</h3>
        //                         <form onSubmit={handleSubmit}>
        //                         <script
        //                             src="//checkout.stripe.com/v2/checkout.js"
        //                             className="stripe-button"
        //                             data-key={PUBLISHABLE_KEY}
        //                             data-amount="2500"
        //                             data-currency="inr"
        //                             data-name="Crafty Gourav"
        //                             data-description="Handmade Art and Craft Products"
        //                             data-locale="auto" >
        //                             </script>
        //                         </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <>
            <button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button>
        </>
    );
}
