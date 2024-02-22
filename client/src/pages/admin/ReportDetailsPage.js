import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Footer } from "../../components/Footer2/GFooter";

export function ReportDetailsPage() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [guest, setGuest] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/admin/reports/${id}`)
            .then((response) => {
                setReport(response.data.report);
                setGuest(response.data.guest);
            })
            .catch((error) => {
                console.error("Error fetching report details:", error);
            });
    }, [id]);
    
    
    const handleDeleteReport = () => {
        axios.post("/admin/delete/report", { id })
            .then((response) => {
                if (response.err) {
                    console.log(response.err);
                    return;
                }
                navigate("/admin/reports"); // Redirect back to the reports page after deleting
            })
            .catch((error) => {
                console.error("Error deleting report:", error);
            });
    };

    const handleInReview = () => {
        console.log(`Report with ID ${id} is now In Review`);
        setMessage(`Report with ID ${id} is now In Review`);
    };

    const handleDismiss = () => {
        setMessage(null);
    }

    if (!report || !guest) {
        return <div>Loading...</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/ReportDetailsPage.css" />
            </Helmet>
            <AdminHeader />
            {message && <div className="smaller-alert alert alert-warning alert-dismissible fade show" role="alert">
                {message}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div className="report-container">
                <div style={{display:"flex" , flexDirection: "column" , alignItems:"center"}}>
                    <h1 >Report Details</h1>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>Report ID:</td>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{report.category}</td>
                            </tr>
                            <tr>
                                <td>Subject:</td>
                                <td>{report.subject}</td>
                            </tr>
                            <tr>
                                <td>Guest ID:</td>
                                <td>{report.guestID}</td>
                            </tr>
                            <tr>
                                <td>Date & Time:</td>
                                <td>{new Date(report.date).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{report.description}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons-container">
                        <button
                            className="delete"
                            onClick={handleDeleteReport}
                            style={{marginRight: '100px'}}
                        >
                            <span className="button-text">Delete</span>
                            <span className="button-icon">
                                <i className="fa-sharp fa-solid fa-trash"></i>
                            </span>
                        </button>
                        <button
                            className="in-review-button"
                            onClick={handleInReview}
                        >
                            <span className="button-text">In Review</span>
                            <span className="button-icon">
                                <i className="fa-sharp fa-solid fa-clock"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </HelmetProvider>
    );
}
