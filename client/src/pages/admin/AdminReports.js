import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Loading } from "../../components/Loading/Loading";
import { Footer } from "../../components/Footer2/GFooter";
// import { Loading } from "../../../client/src/components/Loading/Loading";

export function AdminReports() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchterm, setSearchterm] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get("/admin/reports")
            .then((response) => {
                // Format date for each report
                const formattedReports = response.data.map(report => ({
                    ...report,
                    date: report.date ? new Date(report.date).toISOString() : null // Format date to ISO 8601
                }));
                console.log("Formatted reports:", formattedReports); // Log formatted reports
                
                // Sort reports by date in descending order
                formattedReports.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setReports(formattedReports);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/report/search", { searchterm })
            .then((response) => {
                console.log("Search response:", response);

                if (response.data.results) {
                    const formattedResults = response.data.results.map(result => ({
                        ...result,
                        date: result.date ? new Date(result.date).toISOString() : null
                    }));
                    console.log("Formatted results:", formattedResults); 
                    setReports(formattedResults);
                } else {
                    setMessage('no results');
                    console.log('no results');
                }
            })
            .catch((error) => {
                console.error("Error searching report:", error); 
            });
    }

    const handleDeleteReport = (id) => {
        axios.post("/admin/delete/report", { id })
        .then((response) => {
            if(response.err){
                console.log(response.err);
                return;
            }
            setReports((prevReports) =>
                prevReports.filter((user) => user._id !== id)
            );
            
        })
        .catch((error) => {
            console.error("Error deleting report:", error);
        });
    };

    const handleInReview = (id) => {
        console.log(`Report with ID ${id} is now In Review`);
        setMessage(`Report with ID ${id} is now In Review`);
    };

    // Function to convert ISO date to Indian Standard Time (IST)
    const convertToIST = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    const handleDismiss = () => {
        setMessage(null);
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="/css/adminHomePage.css" />
                <link rel="stylesheet" href="/css/styles.css" />
                <title>Reports-Admin</title>
            </Helmet>
            <AdminHeader />
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input type="text"
                        className="searchTerm" name="searchTerm"
                        id="searchTerm" placeholder="search"
                        value={searchterm}
                        onChange={e => { setSearchterm(e.target.value) }}
                    />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            {message && <div className="smaller-alert alert alert-warning alert-dismissible fade show" role="alert">
                {message}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {reports.map((element) => {
                            console.log("Date:", element.date);
                            return (
                                <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.category}</td>
                                <td>{element.subject}</td>
                                <td>{convertToIST(element.date)}</td> 
                                <td>
                                    <Link to={`/admin/reports/${element._id}`} className="view-button">
                                        <span className="button-text">View</span>
                                        <span className="button-icon">
                                            <i className="fa-sharp fa-solid fa-eye"></i>
                                        </span>
                                    </Link>
                                    <button
                                        className="delete"
                                        onClick={() => handleDeleteReport(element._id)}
                                    >
                                        <span className="button-text">Delete</span>
                                        <span className="button-icon">
                                            <i className="fa-sharp fa-solid fa-trash"></i>
                                        </span>
                                    </button>
                                    <button
                                        className="in-review-button"
                                        onClick={() => handleInReview(element._id)}
                                    >
                                        <span className="button-text">In Review</span>
                                        <span className="button-icon">
                                            <i className="fa-sharp fa-solid fa-clock"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </HelmetProvider>
    );
}