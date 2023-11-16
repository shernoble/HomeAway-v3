import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import "/css/guestHomepage.css";
import { Helmet,HelmetProvider } from "react-helmet-async";
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { NavLink,Link } from "react-router-dom";
import axios from "axios";

export function GuestHomepage() {
//   const [weatherLocation, setWeatherLocation] = useState("Bangalore");
//   const [guests, setGuests] = useState(2);
//   const [weatherData, setWeatherData] = useState(null);
    const [allListings, setAllListings] = useState(useSelector(state => state.guestSearch.response));
    const user=useSelector(state => state.auth.user);
    console.log("home:");
    console.log(user);

    useEffect(() => {
    // Fetch data only if allListings is null

    if (allListings === null) {
        axios
        .get('http://localhost:5050/guest/homepagefull')
        .then((response) => {
            // Update the state with the fetched data
            setAllListings(response.data);
            console.log(allListings);

        })
        .catch(err => {
            console.log(err);
        });
    }
    }, [allListings]); 



    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "120px";
        document.body.style.backgroundColor = "white";
    };

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.5)";
        document.body.style.backdropFilter = "blur(5)";
    };

    return (
        <HelmetProvider>
        {
                <Helmet>
                    <link rel="stylesheet" href="/css/guestHomepage.css" />
                </Helmet>
            }
        <GuestHeader />

        <div id="mySidenav" className="sidenav">
            <Link className="closebtn" onClick={closeNav}>&times;</Link>
            <div className="container">
                <form action="/guest/filter/" method="post">
                    <h5>Property Type</h5>
                    <label>
                    <input type="radio" name="choice" value="All" defaultChecked />
                    <span>All</span>
                    </label>
                    <label>
                    <input type="radio" name="choice" value="Apartment" />
                    <span>Apartment</span>
                    </label>
                    <label>
                    <input type="radio" name="choice" value="Villa" />
                    <span>Villa</span>
                    </label>
                    <label>
                    <input type="radio" name="choice" value="Private House" />
                    <span>Private House</span>
                    </label>
                    <label>
                    <input type="radio" name="choice" value="Farm House" />
                    <span>Farm House</span>
                    </label>
                    <label>
                    <input type="radio" name="choice" value="Cottage" />
                    <span>Cottage</span>
                    </label>
                    <button className="btn btn-outline-dark fil_btn" type="submit">
                    Apply Filters
                    </button>
                </form>
                <a href="/guest/homepagefull" className="btn-a" style={{ paddingLeft: '5px', marginRight: '5px' }}>
                    <input type="button" value="HOME" className="btn btn-outline-light btn2" />
                </a>
            </div>
        </div>


        <div className="search-container">
            <form action="/guest/search" method="post">
            <input type="text" className="searchTerm" name="searchTerm" id="searchTerm" placeholder="search" />
            <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </div>

        <div>
                {/* <a href="/guest-homepage" class="btn btn-outline-primary go_back">Go Back</a> */}
                <button className="go_back button" onClick={openNav}>More Options</button>
            </div>
        {/* <div>
            {weatherData && (
            <div className="container mt-4">
                <div className="row ">
                <div className="col-md-4">
                    <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Current Weather in {weatherLocation}</h5>
                        <h6>{weather_desc}</h6>
                        <img id="weatherIcon" src={weather_icon} alt="Weather Icon" className="img-fluid mb-3" style={{ maxWidth: "50px" }} />
                        <p id="temperature" className="h4">{weather_temp} degree celcius</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )} */}

            {allListings?.length > 0 ? (
            <section className="houses" id="main">
                {allListings.map((element) => (
                
                    <div className="house" key={element._id}>
                        <NavLink key={element._id} to={`/guest/reserve/${element._id}`}>
                        <div style={{ backgroundImage: `url(${element.img_url1})`,}} className="house-img"></div>
                        <p className="title">{element.Title.substring(0, 30) + "..."}</p>
                        <p className="description">{element.Bedrooms} Bedroom(s), {element.Bathrooms} Bathroom(s)</p>
                        <p className="location">{element.Address.District}, {element.Address.State}</p>
                        <p className="pricep">Cost/Night: Rs.{element.CostPerN}</p>
                        </NavLink>
                    </div>
            
                ))}
            </section>
            ) : (
            <p>no results found!</p>
            )}
        </HelmetProvider>
        // </div>
    );
}
