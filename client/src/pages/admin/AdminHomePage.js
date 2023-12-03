import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Modal } from "../../components/modal/confirmModal";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function AdminHomePage() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");

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

    // The handleDeleteListing function remains the same, as it handles the deletion logic

    const handleDeleteListing = (id) => {
        axios.post("http://localhost:5050/admin/delete/listing", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                return;
            }
            setListings((prevListings) =>
                prevListings.filter((user) => user._id !== id)
            );
            handleCloseModal();
            
        })
        .catch((error) => {
            console.error("Error deleting list:", error);
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
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            {message && <div className="smaller-alert alert alert-warning alert-dismissible fade show" role="alert">
                    {message}
                    <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            {listings ? (
            listings.map((element) => (
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
                        <button
                            className="delete-button"
                            onClick={() => handleShowModal(element._id)}
                        >
                            <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
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
        </HelmetProvider>
    );
}
