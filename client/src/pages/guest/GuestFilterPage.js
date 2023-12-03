import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import "/css/guestHomepage.css";
import { Helmet,HelmetProvider } from "react-helmet-async";
import { NavLink,Link } from "react-router-dom";
import axios from "axios";

import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { Filters } from "../../components/Filters/Filters";
import { Footer } from "../../components/Footer/Footer";


export function GuestHomepage() {
    const [allListings, setAllListings] = useState(useSelector(state => state.guestSearch.response));
    const [filterListings,setFilterListings]=useState([]);
    const [searchterm,setSearchterm]=useState();
    const [message,setMessage]=useState();
    // const user=useSelector(state => state.auth.user);
    // console.log("home:");
    // console.log(user);

    useEffect(() => {
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


// get search results
    const handleSearch=(e) => {
        e.preventDefault();
        // send search query for all listings in db
        // return results
        axios.post('http://localhost:5050/guest/search',{searchterm})
        .then((response) => {
            console.log("this is what we received:");
            console.log(response.data.results);
            if(response.data.success){
                setAllListings(response.data.results);
                setFilterListings([]);
                console.log("after search:");
                console.log(filterListings);
                // console.log();
            }
            else{
                setMessage('no results');
                console.log('no results');
            }
        })
        
    }
// get all results
    const handleHomepage = () => {
        axios
        .get('http://localhost:5050/guest/homepagefull')
        .then((response) => {
            // Update the state with the fetched data
            setAllListings(response.data);
            console.log("filtered res after full home:");
            console.log(filterListings);
            // console.log(allListings);

        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleFilter=(e)=>{
        // filter based on curr listings
        e.preventDefault();
        setFilterListings([]);
        const propertyType = document.querySelector('input[name="choice"]:checked').value;
        console.log("value:"+propertyType);
        if (propertyType !== 'All') {
            const filteredListings = allListings.filter(element => {
                // console.log(element.PropertyType);
                
                return element.PropertyType === propertyType;
            });
            setFilterListings(filteredListings);
            if(filteredListings.length===0){
                // set message
                setMessage("No results found for property type : "+propertyType);
            }
            console.log("after adding filters:");
            console.log(filterListings);
            console.log(allListings);
        } else {
            setFilterListings([]); // If 'All' is selected, reset the filter
        }
    }

    const handleDismiss=()=>{
        setMessage(null);
    }

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
                    <title>HomePage-Guest</title>
                </Helmet>
            }
        <GuestHeader />

        <div id="mySidenav" className="sidenav">
            <Link className="closebtn" onClick={closeNav}>&times;</Link>
            <Filters handleFilter={handleFilter} handleHomepage={handleHomepage}/>
        </div>


        <div className="search-container">
            <form onSubmit={handleSearch}>
            <input type="text" className="searchTerm" name="searchTerm" 
            id="searchTerm" placeholder="search"
            value={searchterm}
            onChange={e => {setSearchterm(e.target.value)}}
            />
            <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </div>

            <div>
                <button className="go_back button" onClick={openNav}>More Options</button>
            </div>

            {message && (
                <div className="alert alert-danger alert-dismissible fade show mx-auto" role="alert" style={{ maxWidth: '700px' }}>
                    {message}
                    <button type="button" onClick={handleDismiss} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}


            {filterListings && filterListings.length > 0 ? (
            <section className="houses" id="main">
                {filterListings.map((element) => (
                
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
                <section className="houses" id="main">
                {allListings && allListings.map((element) => (
                
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
            )}
        <Footer/>
        </HelmetProvider>
        // </div>
    );
}
