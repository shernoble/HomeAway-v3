import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Helmet,HelmetProvider } from "react-helmet-async";

export function AdminHomePage() {
    const [listings, setlistings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchterm,setSearchterm]=useState('');
    const [message,setMessage]=useState();


    useEffect(() => {
        // Fetch the guest list when the component mounts
        axios
            .get("/admin/homepage")
            .then((response) => {
                console.log(response[0]);
                setlistings(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/listing/search",{searchterm})
        .then((response) => {
            console.log("this is what we received:");
            console.log(response);
            if(response.data.results){
                setlistings(response.data.results);
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

    const handleDeleteListing = (id) => {
        // Handle user deletion here, e.g., by making an API request
        axios.post("/admin/delete/listing", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                return;
            }
            setlistings((prevReports) =>
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
            </Helmet>
        }
            <AdminHeader />
            <div className="search-listings">
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
            {listings ? (
                listings.map((element) => (
                    <div className="item" key={element._id}>
                        <div className="img">
                            <img className="house-img" src={element.img_url1} alt="house-img" />
                        </div>
                        <div className="house-desc">
                            <h5 style={{ marginBottom: "0" }}>{element.Title}</h5>
                            <div className="listings-form">
                                <form action="/admin/delete/listing" method="post">
                                    <input type="hidden" name="elementID" value={element._id}></input>
                                    <span>
                                        <button className="delete-button" data-bs-toggle="modal" data-bs-target={`#modal1${element._id}`} type="button">
                                            <i className="fa-sharp fa-solid fa-trash"></i>
                                        </button>
                                    </span>
                                    <div className="modal fade" id={`modal1${element._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Admin Confirmation</h5>
                                                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure you want to delete listing <b>{element._id}</b> ?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" className="btn btn-danger">Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <p style={{ marginBottom: "0" }}>ListingID : {element._id}</p>
                            <p style={{ marginBottom: "0" }}>{element.Address.Line1}</p>
                            <p style={{ marginBottom: "0" }}>{element.Address}</p>
                        </div>
                    </div>
                ))
                ) : (
                    <div className="noresult">
                        <h3>No listing(s) found.</h3>
                    </div>
                )}
                {listings && (
                    <form action="/admin/homepage" method="get">
                        <button className="btn-outline-primary" type="button">Go Back</button>
                    </form>
                )}
            </div>
        </HelmetProvider>
    );
}
