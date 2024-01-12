import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';

function P8h() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const navigate = useNavigate();

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };
  const handleBack = () => {
    navigate('/host/p7h');
};
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (textAreaValue.length < 2) {
      alert("Give some short title of at least 2 characters");
    } else {
      // Your logic for submitting the form or navigating to the next page
      navigate('/host/p9h');
    }
  };

  return (
    <HelmetProvider>
    {
      <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p8h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
    }
      <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
      <h1 style={{ marginTop: '140px', marginLeft: '500px', fontSize: '40px' }}>Now let us tell about your place</h1>
      <p style={{ marginTop: '10px', marginLeft: '500px' }}>Short titles work best. Have fun with it; you can always change it later.</p>
      <form action="/host/p8h" method="post" onSubmit={handleFormSubmit}>
        <textarea
          id="txtar"
          name="txtar"
          rows="10"
          style={{ marginTop: '10px', marginLeft: '500px', marginBottom: '50px' }}
          value={textAreaValue}
          onChange={handleTextAreaChange}
          required
        ></textarea>
        <hr />
        <div>
          <div>
          <button className="c1" type="button" onClick={handleBack}>
                        Back
            </button>
          </div>
          <div>
          <button
  className="c2"
  type="submit"
  style={{ cursor: textAreaValue.length > 1? 'pointer' : 'not-allowed',backgroundColor: textAreaValue.length > 1 ? 'black' : 'intial',color: textAreaValue.length > 1 ? 'white' : 'intial' }}
  onClick={handleFormSubmit}
>
  Next
</button>

          </div>
        </div>
      </form>
    </HelmetProvider>
  );
}

export default P8h;