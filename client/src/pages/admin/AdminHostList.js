import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Modal } from "../../components/modal/confirmModal";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Loading } from "../../components/Loading/Loading";
import { Footer } from "../../components/Footer2/GFooter";

export function AdminHostList() {
    const [hostList, setHostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchterm, setSearchterm] = useState('');
    const [message, setMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", desc: "", onConfirm: null });
    const [verifiedFilter, setVerifiedFilter] = useState(null); // State to track filter option

    useEffect(() => {
        // Fetch the host list when the component mounts
        axios
            .get("/admin/hostList")
            .then((response) => {
                setHostList(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/host/search", { searchterm })
            .then((response) => {
                if (response.data.results) {
                    setHostList(response.data.results);
                } else {
                    setMessage('No results');
                }
            })
            .catch((error) => {
                console.error("Error searching for hosts:", error);
            });
    }

    const handleShowModal = (userName, userId) => {
        setModalContent({
            title: "Delete User",
            desc: `Are you sure you want to delete ${userName} ?`,
            onConfirm: () => handleDeleteUser(userId),
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDismiss = () => {
        setMessage(null);
    }

    const handleDeleteUser = (id) => {
        axios.post("/admin/delete/host", { id })
            .then((response) => {
                // Filter out the deleted user from the hostList
                if (response.err) {
                    console.log(response.err);
                    setMessage("error in deleting guest!try again later");
                    return;
                }
                else{
                    setMessage("host "+id+" deleted!");
                }
                setHostList((prevHostList) =>
                    prevHostList.filter((user) => user._id !== id)
                );
                handleCloseModal();
            })
            .catch((error) => {
                setMessage("error delting guest!Pls try again later!!");
                console.error("Error deleting user:", error);
            });
    };


    const handleVerifyUser=(id) => {
        // console.log("user verified");
        // send id to back end
        axios.post("http://localhost:5050/admin/verify/host", { id })
            .then((response) => {
                console.log(response.data.message);
                if (!response.data.success) {
                    setMessage("error verifying guest!Pls try again later!");
                    console.log(response.message);
                    return;
                }
                else{
                    setMessage("Host "+id+" is now verified!!");
                }
            })
            .catch((error) => {
                setMessage("error verifying guest!Pls try again later!");
                console.error("Error verifying user:", error);
            });
    }

    const handleFilterVerified = (verified) => {
        setVerifiedFilter(verified);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Apply the filter based on the verifiedFilter state
    let filteredHostList = hostList;
    if (verifiedFilter !== null) {
        filteredHostList = hostList.filter(host => host.Verified === verifiedFilter);
    }

    return (
        <HelmetProvider>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/adminHomePage.css" />
                    <link rel="stylesheet" href="/css/styles.css" />
                    <title>HostList-Admin</title>
                </Helmet>
            }
            <AdminHeader />
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input type="text"
                        className="searchTerm" name="searchTerm"
                        id="searchTerm" placeholder="Search"
                        value={searchterm}
                        onChange={e => { setSearchterm(e.target.value) }}
                    />
                    <button type="submit" className="btn btn-success search-btn"><i className="fa fa-search"></i></button>
                </form>
            </div>

            {message && <div className={`smaller-alert alert ${message.includes('error') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
                {message}
                <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            <div className="container">
            <div className="btn-group mb-3">
                <button 
                    onClick={() => handleFilterVerified(null)} 
                    className={`btn ${verifiedFilter === null ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    All Hosts
                </button>
                <button 
                    onClick={() => handleFilterVerified(true)} 
                    className={`btn ${verifiedFilter === true ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    Show Verified Hosts
                </button>
                <button 
                    onClick={() => handleFilterVerified(false)} 
                    className={`btn ${verifiedFilter === false ? 'btn-custom' : 'btn-custom-outline'}`}
                >
                    Show Unverified Hosts
                </button>
            </div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {filteredHostList.map((element) => (
                            <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.UserName}</td>
                                <td>{element.Email}</td>
                                <td>
                                    <button
                                        className="delete-button btn btn-danger"
                                        onClick={() => handleShowModal(element.UserName, element._id)}
                                    >
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                    <tbody>
                    {filteredHostList.map((element) => (
                        <tr key={element._id}>
                            <td>{element._id}</td>
                            <td>{element.UserName}</td>
                            <td>{element.Email}</td>
                            <td>
                                {element.Verified ? (
                                    <button
                                        className="delete-button btn btn-danger"
                                        onClick={() => handleShowModal(element.UserName, element._id)}
                                    >
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleVerifyUser(element._id)}
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
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <Modal
                    show={showModal}
                    handleClose={handleCloseModal}
                    title={modalContent.title}
                    desc={modalContent.desc}
                    onConfirm={modalContent.onConfirm}
                />
            </div>
            <Footer/>
        </HelmetProvider>
    );
}
