import React from 'react';
import { Link } from 'react-router-dom';

export function BookingDetailsModal({ booking, onClose,iscurr,handleClick,status }) {
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Booking Details</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Booking ID:</strong> {booking._id}</p>
                        <p><strong>Status:</strong> {booking.Status}</p>
                        <p><strong>From Date:</strong> {new Date(booking.FromDate).toLocaleDateString()}</p>
                        <p><strong>To Date:</strong> {new Date(booking.ToDate).toLocaleDateString()}</p>
                        {/* Add more details here if needed */}
                    </div>
                    <div className="modal-footer">
                        {!iscurr &&
                        <>
                            <Link to="/guest/report">Report</Link>
                            {/* <button type="button" className="btn btn-primary" onClick={handleClick}>Rate/Review</button> */}

                        </>
                        }
                        <button type="button" className="btn btn-primary" onClick={handleClick}>View Booking</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        {(iscurr && status!=="cancelled")&& <button type="button" className="btn btn-danger" onClick={handleClick}>Cancel</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

