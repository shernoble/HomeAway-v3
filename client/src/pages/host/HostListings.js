import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Loading} from '../../components/Loading/Loading'; 
import { Footer } from "../../components/Footer/Footer";

export function HostListings() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get("/host/Listings")
        .then((response) => {
            setListings(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    const handleEditListing = (id, newData) => {
        axios.put(`/api/listings/${id}`, newData)
            .then(response => {
                setListings(prevListings => prevListings.map(listing => {
                    if (listing._id === id) {
                        return { ...listing, ...newData };
                    }
                    return listing;
                }));
            })
            .catch(error => console.error("Error editing listing:", error));
    };

    const handleRemoveListing = (id) => {
        axios.delete(`/api/listings/${id}`)
            .then(response => {
                setListings(prevListings => prevListings.filter(listing => listing._id !== id));
            })
            .catch(error => console.error("Error removing listing:", error));
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Link to="/host/p1h">
                    <button className="btn" style={{backgroundColor:'#a1a1a2', color: 'black'}}>Add Listing</button>
                </Link>
            </div>
            {listings.length ? (
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
                            <div className="action-buttons">
                                <button
                                    className="btn"
                                    style={{backgroundColor:'#a1a1a2', color: 'black'}}
                                    onClick={() => handleEditListing(element._id, { Title: 'New Title', Address: { Line1: 'New Line1', Line2: 'New Line2' } })}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn"
                                    style={{backgroundColor:'#a1a1a2', color: 'black'}}
                                    onClick={() => handleRemoveListing(element._id)}
                                >
                                    Remove
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
            <Footer/>
        </div>
    );
}
