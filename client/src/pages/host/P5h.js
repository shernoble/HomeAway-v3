import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';


function P5h() {
    const navigate = useNavigate();
  const [guests, setGuests] = useState('');
  const [beds, setBeds] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [bedroom, setBedroom] = useState('');

  const handleNextPage = () => {
    if (guests === '' || beds === '' || bathroom === '' || bedroom === '') {
      alert('Please Enter all the details');
      return;
    }
    else{
        navigate('/host/p6h');
    }
  };

  const handleBack = () => {
    navigate('/host/p4h');
  };

  return (
    <HelmetProvider>
    {
      <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p4h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
    }
        <div className="navbar header">
          <h2 style={{ textDecoration: 'none' }} className="heading1">
            Home Away
          </h2>
        </div>
        <h3 style={{ marginLeft: '450px', fontSize: '45px', marginBottom: '0px', height: '20px', marginTop: '30px' }}>
          Some Basics about your place
        </h3>
        <br />
        <br />
        <p style={{ marginLeft: '450px', fontSize: '15px', marginBottom: '0px' }}>You'll add more details such as no.of guests, beds...</p>
        <br />
        <form action="/p5h" method="post">
          <div className="main-block" style={{ height: '400px', width: '500px', marginTop: '0px', marginLeft: '480px', padding: '0px' }}>
            <div className="info">
              <p style={{ fontSize: '20px' }}>Guests</p>
              <input
                id="guests"
                type="number"
                name="guests"
                min="1"
                required
                style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '0px' }}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
              <p style={{ fontSize: '20px' }}>Beds</p>
              <input
                id="beds"
                type="number"
                name="beds"
                min="1"
                required
                style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '0px' }}
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              />
              <p style={{ fontSize: '20px' }}>Bathrooms</p>
              <input
                id="bathroom"
                type="number"
                name="bathroom"
                min="1"
                required
                style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '0px' }}
                value={bathroom}
                onChange={(e) => setBathroom(e.target.value)}
              />
              <p style={{ fontSize: '20px' }}>Bedrooms</p>
              <input
                id="bedroom"
                type="number"
                name="bedroom"
                min="1"
                required
                style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '0px' }}
                value={bedroom}
                onChange={(e) => setBedroom(e.target.value)}
              />
            </div>
          </div>
          <br />
          <hr style={{marginTop: '20px'}} />
          <div>
            <div>
            <button className="c1" type="button" onClick={handleBack}>
              Back
            </button>
            </div>
            <div>
              <button className="cn" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </div>
        </form>
    </HelmetProvider>  
  );
};

export default P5h;
