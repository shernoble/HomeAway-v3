import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import axios from 'axios';


export default function P12h() {
  const navigate = useNavigate();
  const [houseinfo, setHouseinfo] = useState([]);
  const getLink = "http://localhost:5050/host/getUserListings";

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const response = await axios.get(getLink); 
        setHouseinfo(response.data.houseinfo);
      } catch (error) {
        console.error('Error fetching user listings:', error);
      }
    };

    fetchUserListings();
  }, []);
  

  const handleCreateListingClick = () => {
    navigate('/host/p1h');
  };

  return (
    <HelmetProvider>
      {
            <Helmet>
                
                <link rel="stylesheet" href="/css/p12h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            }
  
    <div>
      <div className="header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>

      <h1 style={{ marginTop: '50px', marginLeft: '660px', marginBottom: '70px' }}>Your Listings</h1>
      <button onClick={handleCreateListingClick} className="c1">
        Create new listing
      </button>
      <a href="/host/dashboard">
        <i className="fa-solid fa-arrow-left button" id="prev"></i>
      </a>

      <div style={{ marginRight: '400px', marginLeft: '220px', marginBottom: '5px', fontSize: '25px' }}>
        Your Listings:-
      </div>
      {houseinfo && houseinfo.length > 0 ? (
        <div className="b1">
          {houseinfo.map((house) => (
            <div key={house._id} className="container" style={{ marginLeft: '180px', marginTop: '20px' }}>
              <img src={house.img_url1} alt="img_url1" height="200px" width="250px" style={{ marginLeft: '130px', marginTop: '50px' }} />
              <img src={house.img_url2} alt="img_url2" height="200px" width="250px" style={{ marginLeft: '130px', marginTop: '50px' }} />
              <img src={house.img_url3} alt="img_url3" height="200px" width="250px" style={{ marginLeft: '130px', marginTop: '50px' }} />
              <img src={house.img_url4} alt="img_url4" height="200px" width="250px" style={{ marginLeft: '130px', marginTop: '50px' }} />
              <img src={house.img_url5} alt="img_url5" height="200px" width="250px" style={{ marginLeft: '130px', marginTop: '50px' }} />
              <p style={{ marginLeft: '130px' }}>Title:- {house.Title}</p>
              <p style={{ marginLeft: '130px' }}>Type Of Place:- {house.Desc1}</p>
              <p style={{ marginLeft: '130px' }}>Property Type:- {house.PropertyType}</p>
              <p style={{ marginLeft: '130px' }}>Room Type:- {house.RoomType}</p>
              <p style={{ marginLeft: '130px' }}>Location:- {house.Address.Line1}, {house.Address.Line2}, {house.Address.District}, {house.Address.State}, {house.Address.Pincode}</p>
              <p style={{ marginLeft: '130px' }}>No.of guests:- {house.MaxGuests}</p>
              <p style={{ marginLeft: '130px' }}>Cost per night:- {house.CostPerN}</p>
              <p style={{ marginLeft: '130px' }}>Amenities:- {house.Facilities}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings found</p>
      )}
    </div>
    </HelmetProvider>
  );
}
