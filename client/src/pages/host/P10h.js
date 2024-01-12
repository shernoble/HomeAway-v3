import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelmetProvider,Helmet } from 'react-helmet-async';


function P10h() {
    const navigate = useNavigate();
  const [price, setPrice] = useState(850);

  const increment = () => {
    setPrice((prevPrice) => prevPrice + 100);
  };

  const decrement = () => {
    if (price > 850) {
      setPrice((prevPrice) => prevPrice - 100);
    } else {
      alert('Minimum price is ₹850');
      setPrice(850);
    }
  };

  const handleFormSubmit = () => {
    navigate('/host/congo')
  };
  const handleBack = () => {
    navigate('/host/p9h');
  };

  return (
    <HelmetProvider>
    {
      <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p10h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
    }
      <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
      <h2 style={{ marginTop: '80px',marginBottom: '20px', marginLeft: '500px', fontSize: '40px' }}>
        Now, set your price
      </h2>
      <form action="/p10h" method="post" onSubmit={handleFormSubmit}>
      <div className="container">
        <div className="quantity1">
          <div className="Minus">
            <Link href="#" id="minus" onClick={decrement} className="minus_plus">
              <span>-</span>
            </Link>
          </div>

          <div className="Input">
            <input
              id="valueinput"
              name="valueinput"
              type="text"
              className="quantity_input"
              placeholder="₹"
              value={price}
            />
          </div>

          <div className="Plus">
            <Link href="#" id="add" onClick={increment} className="minus_plus">
              <span>+</span>
            </Link>
          </div>

          <div>
            <p style={{ textAlign: 'center', fontSize: '20px', marginLeft: '10px', marginTop: '10px' }}>
              per night
            </p>
            <p style={{ textAlign: 'center', fontSize: '20px', marginLeft: '10px', marginTop: '10px' }}>
              Set your price Reasonably <br /> Prices start from ₹850
            </p>
          </div>
        </div>
        </div>
        <hr style={{marginTop: '120px'}}/>
        <div>
          <div>
            <button className="c1" type="button" onClick={handleBack}>
              Back
            </button> 
          </div>
          <div>
            <button className="cnm" type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </HelmetProvider>
  );
}

export default P10h;
