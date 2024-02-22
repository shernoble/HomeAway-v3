import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Modal } from "../../components/modal/confirmModal";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Loading } from "../../components/Loading/Loading";
import { Footer } from "../../components/Footer2/GFooter";

export function AdminHomePage() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState(null); // State to track filter option

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", desc: "", onConfirm: null });


    useEffect(() => {
        // Fetch the listing when the component mounts
        axios
        .get("/admin/homepage")
        .then((response) => {
            setListings(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/listing/search", { searchTerm }).then((response) => {
        if (response.data.results) {
            setListings(response.data.results);
        } else {
            setMessage('No results');
        }
        });
    };

    const handleShowModal = (id) => {
        setModalContent({
            title: "Delete User",
            desc: `Are you sure you want to delete ${id} ?`,
            onConfirm: () => handleDeleteListing(id),
        });
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDismiss = () => {
        setMessage(null);
    };

    const handleDeleteListing = (id) => {
        axios.post("http://localhost:5050/admin/delete/listing", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                setMessage("error in deleting guest!try again later");
                return;
            }
            else{
                setMessage("listing "+id+" deleted!");
            }
            setListings((prevListings) =>
                prevListings.filter((user) => user._id !== id)
            );
            handleCloseModal();
            
        })
        .catch((error) => {
            setMessage("error delting guest!Pls try again later!!");
            console.error("Error deleting list:", error);
        });
            
    };

    const handleVerifyListing=(id) => {
        // console.log("user verified");
        // send id to back end
        axios.post("http://localhost:5050/admin/verify/listing", { id })
            .then((response) => {
                console.log(response.data.message);
                if (!response.data.success) {
                    setMessage("error verifying guest!Pls try again later!");
                    console.log(response.message);
                    return;
                }
                else{
                    setMessage("Listing "+id+" is now verified!!");
                }
            })
            .catch((error) => {
                setMessage("error verifying listing! Pls try again later!");
                console.error("Error verifying Listing:", error);
            });
    }

    // const handleFilterChange = (e) => {
    //     setVerifiedFilter(e.target.value);
    // };
    const handleFilterVerified = (verified) => {
        setVerifiedFilter(verified);
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Apply the filter based on the verifiedFilter state
    let filteredListings = listings;
    if (verifiedFilter !== null) {
        filteredListings = listings.filter(listing => listing.Verified === verifiedFilter);
    }

    return (
        <HelmetProvider>
        <Helmet>
            <link rel="stylesheet" href="/css/adminHomePage.css" />
            <link rel="stylesheet" href="/css/styles.css" />
            <title>HomePage-Admin</title>
        </Helmet>
        <AdminHeader />
        <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input type="text" 
                    className="searchTerm" name="searchTerm" 
                    id="searchTerm" placeholder="search" 
                    value={searchTerm}
                    onChange={e => {setSearchTerm(e.target.value)}}
                    />
                    <button type="submit" className="btn btn-success search-btn"><i className="fa fa-search"></i></button>
                </form>
        </div>
        {message && <div className={`smaller-alert alert ${message.includes('error') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
                {message}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        <div className="btn-group mb-3 ms-4">
                <button 
                    onClick={() => handleFilterVerified(null)} 
                    className={`btn ${verifiedFilter === null ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    All Listings
                </button>
                <button 
                    onClick={() => handleFilterVerified(true)} 
                    className={`btn ${verifiedFilter === true ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    Verified Listings
                </button>
                <button 
                    onClick={() => handleFilterVerified(false)} 
                    className={`btn ${verifiedFilter === false ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    Unverified Listings
                </button>
        </div>
            {filteredListings.length ? (
            filteredListings.map((element) => (
                <div className="item" key={element._id} >
                <div className="img">
                    <img className="house-img" src={element.img_url1} alt="house-img" />
                </div>
                <div className="house-desc">
                    <h5 style={{ marginBottom: "0" }}>{element.Title}</h5>
                    <p style={{ marginBottom: "0" }}>ListingID: {element._id}</p>
                    <p style={{ marginBottom: "0" }}>{element.Address.Line1}</p>
                    <p style={{ marginBottom: "0" }}>{element.Address.Line2}</p>
                    <div className="delete-container">
                    {element.Verified?(
                        <button
                            className="align-btn btn btn-danger delete-button"
                            onClick={() => handleShowModal(element._id)}
                        >
                            <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                    ):(
                        <>
                        <button
                            className="btn btn-success"
                            onClick={() => handleVerifyListing(element._id)}
                        >
                            Verify
                        </button>
                        <button
                            className="delete-button btn btn-danger"
                            onClick={() => handleShowModal(element.UserName, element._id)}
                        >
                            <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                        </>
                    )}
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className="noresult">
                <h3>No listing(s) found.</h3>
            </div>
            )}
            <Modal
                show={showModal}
                handleClose={handleCloseModal}
                title={modalContent.title}
                desc={modalContent.desc}
                onConfirm={modalContent.onConfirm}
            />
            <Footer/>
        </HelmetProvider>
    );
}
