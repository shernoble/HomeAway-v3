import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../actions/index";
import "./AdminHomePage.css";
import "./styles.css";

function AdminHomePage() {
    const guestList = useSelector((state) => state.data.data);
    const isLoading = useSelector((state) => state.data.isLoading);
    const error = useSelector((state) => state.data.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
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
                    </tr>
                </thead>
                <tbody>
                    {guestList.map((element) => (
                        <tr key={element._id}>
                            <td>{element._id}</td>
                            <td>{element.UserName}</td>
                            <td>{element.Email}</td>
                            <form action="/admin/delete/guest" method="post">
                                <input type="hidden" name="elementID" value={element._id} />
                                <td>
                                    <button className="delete-button" data-bs-toggle="modal" data-bs-target={`#MyModal${element._id}`} type="button">
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </button>
                                </td>
                                <div className="modal fade" id={`MyModal${element._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Admin Confirmation</h5>
                                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure you want to delete user <b>{element.UserID}</b>?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-success">Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    );
}

export default AdminHomePage;
