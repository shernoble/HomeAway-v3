import React, { useState,useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Helmet,HelmetProvider } from "react-helmet-async";

export function AdminHostList() {
    const [hostList, setHostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the guest list when the component mounts
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

    const handleDeleteUser = (id) => {
        axios.post("/admin/delete/host", { id })
        .then((response) => {
            // Filter out the deleted user from the guestList
            if(response.err){
                console.log(response.err);
                return;
            }
            setHostList((prevHostList) =>
                prevHostList.filter((user) => user._id !== id)
            );
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
            </Helmet>
        }
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
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hostList.map((element) => (
                            <tr key={element._id}>
                                <td>{element._id}</td>
                                <td>{element.UserName}</td>
                                <td>{element.Email}</td>
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
