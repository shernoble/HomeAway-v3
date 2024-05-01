import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider,Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

function P9h() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [description, setDescription] = useState("You'll have a great time at this place to stay comfortably.");
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (description.length < 5) {
      alert('Give some description of at least 5 characters');
    } else {
      dispatch({ type: 'UPDATE_DESCRIPTION', payload: description });
      navigate('/host/p10h') 
    }
  };
  const handleBack = () => {
    navigate('/host/p8h');
  };

  return (
    <HelmetProvider>{
      <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p4h.css" />
                <link rel="stylesheet" href="/css/p8h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
    }
        <div className="navbar header">
          <h2 style={{ textDecoration: 'none' }} className="heading1">
            Home Away
          </h2>
        </div>
        <h1 style={{ marginTop: '100px', marginLeft: '500px', fontSize: '40px' }}>Create your description</h1>
        <p style={{ marginTop: '10px', marginLeft: '500px' }}>Share what makes your place special.</p>
        <form action="/p9h" method="post" onSubmit={handleFormSubmit}>
          <textarea
            rows="10"
            id="txtarr"
            name="txtarr"
            style={{ marginTop: '10px', marginLeft: '500px', marginBottom: '60px' }}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <hr style={{marginTop: '30px'}} />
          <div>
          <div>
            <button className="c1" type="button" onClick={handleBack}>Back</button>
         </div>
            <div>
              <button className="cn" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
    </HelmetProvider>
  );
};

export default P9h;
