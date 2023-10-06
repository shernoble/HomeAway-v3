
import React from "react";
import "./Header.css"

export function Header(){
    return (
        <>
            <div className="navbar header">
            <a href="/guest/homepagefull"><h2 className="heading1">HomeAway</h2></a>

            <div className="dropdown show drop-css">
                <div className="container mt-5">
                    <div className="dropdown">
                    <a className="dropdown-toggle text-reset" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="far fa-user fa-xl profile-img"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuLink">
                        {/* <% if (userLoggedIn) { %> */}
                        <a className="dropdown-item" href="/guest/profile">Profile</a>
                        <a className="dropdown-item" href="/guest/logout">Logout</a>
                        <a className="dropdown-item" href="/guest/report">Report</a>
                        <a className="dropdown-item" href="/guest/homepagefull">Home</a>
                        {/* <% } else { %> */}
                        <a className="dropdown-item" href="/guest/login">Login</a>
                        <a className="dropdown-item" href="/guest/register">Signup</a>
                        <a className="dropdown-item" href="/guest/homepagefull">Home</a>
                        {/* <% } %> */}
                    </div>
                    </div>
                </div>
                </div>
        </div>
        </>
    )
}