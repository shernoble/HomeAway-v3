import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import axios from 'axios';


function Congo() {
  const navigate = useNavigate();
  const finsubmitLink = "http://localhost:5050/host/congo";
  const listingData = useSelector(state => state.listing);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Send POST request to backend server
      const response = await axios.post(finsubmitLink, { listingData });
      
      console.log("Form submitted successfully");
      console.log("Response:", response.data); // Log response from server
      navigate('/host/dashboard');
    } catch (error) {
      console.error(`Error received from axios.post: ${JSON.stringify(error)}`);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="/css/congo.css" />
        <title>Host-HomeAway</title>
      </Helmet>
      <a href="/host/p10h">
        <i className="fas fa-arrow-left button" id="prev"></i>
      </a>
      <div className="subContainer">
        <div className="popup" id="popup">
          <img src="/images/congo-1.jpg" alt="Congrats" />
          <h2>Congratulations!</h2>
          <p>Your listing is successful. Thanks!</p>
          <form onSubmit={handleFormSubmit}>
            <button type="submit">OK</button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Congo;