import React, { useState,useEffect } from "react";
import "./AdminHomePage.css";
import "./styles.css";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

export function AdminReports() {
    const [reports, setreports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the guest list when the component mounts
        axios
            .get("/admin/reports")
            .then((response) => {
                setreports(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    const handleDeleteUser = (userId) => {
        // Handle user deletion here, e.g., by making an API request
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <AdminHeader />
            <div className="search-container">
                <form action="/admin/guests/search" method="post">
                    <input type="text" className="searchTerm" name="search_ch" id="search_ch" placeholder="search" />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>

            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Category</th>
                            <th scope="col">Subject</th>
                            {/* <th scope="col">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((element) => (
                            <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.category}</td>
                                <td>{element.subject}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteUser(element._id)}
                                    >
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
