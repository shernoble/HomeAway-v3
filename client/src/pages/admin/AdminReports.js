import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Helmet,HelmetProvider } from "react-helmet-async";

export function AdminReports() {
    const [reports, setreports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchterm,setSearchterm]=useState('');
    const [message,setMessage]=useState();

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

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/report/search",{searchterm})
        .then((response) => {
            console.log("this is what we received:");
            console.log(response);
            if(response.data.results){
                setreports(response.data.results);
            }
            else{
                setMessage('no results');
                console.log('no results');
            }
        })
    }

    const handleDismiss = () => {
        setMessage(null);
    }

    const handleDeleteUser = (id) => {
        // Handle user deletion here, e.g., by making an API request
        axios.post("/admin/delete/report", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                return;
            }
            setreports((prevReports) =>
                prevReports.filter((user) => user._id !== id)
            );
            
        })
        .catch((error) => {
            console.error("Error deleting report:", error);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <HelmetProvider>
        {
            <Helmet>
                <link rel="stylesheet" href="/css/adminHomePage.css" />
                <link rel="stylesheet" href="/css/styles.css" />
                <title>Reports-Admin</title>
            </Helmet>
        }
            <AdminHeader />
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input type="text" 
                    className="searchTerm" name="searchTerm" 
                    id="searchTerm" placeholder="search" 
                    value={searchterm}
                    onChange={e => {setSearchterm(e.target.value)}}
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
        </HelmetProvider>
    );
}
