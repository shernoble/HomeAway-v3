import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function ListingDetails({num_days,listing}){
    return(
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/guest-confirmation.css" />
            </Helmet>
            <div className="ccl">
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
            <div className="ccl">
            <h5>Contact Information</h5>
            {/* get phone number and name */}
            <ul>
                <li>UserName: {listing.host.hostUserName}</li>
                <li>PhoneNumber: {listing.host.hostPhone?listing.host.hostPhone:'+91 9449223627'}</li>
                <li>Email: {listing.host.hostEmail?listing.host.hostEmail:'host23@gmail.com'}</li>
            </ul>
            </div> 
        </HelmetProvider>
    )
}