import React, { useState,useEffect } from "react";
import {Helmet,HelmetProvider} from "react-helmet-async";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Modal } from "../../components/modal/confirmModal";

export function AdminGuestList() {
    const [guestList, setGuestList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchterm,setSearchterm]=useState('');
    const [message,setMessage]=useState();

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", desc: "", onConfirm: null });

    useEffect(() => {
        // Fetch the guest list when the component mounts
        axios
            .get("/admin/guestList")
            .then((response) => {
                setGuestList(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    const handleSearch = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5050/admin/guest/search",{searchterm})
        .then((response) => {
            console.log("this is what we received:");
            console.log(response);
            if(response.data.results){
                setGuestList(response.data.results);
            }
            else{
                setMessage('no results');
                console.log('no results');
            }
        })
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
        axios.post("http://localhost:5050/admin/delete/guest", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                return;
            }
            setGuestList((prevGuestList) =>
                prevGuestList.filter((user) => user._id !== id)
            );
            handleCloseModal();
            
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
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
                <title>GuestList-Admin</title>
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
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guestList.map((element) => (
                            <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.UserName}</td>
                                <td>{element.Email}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleShowModal(element.UserName, element._id)}
                                    >
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </button>
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
        </HelmetProvider>
    );
}
