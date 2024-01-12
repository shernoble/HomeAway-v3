import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider,Helmet } from 'react-helmet-async';
function Congo() {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    navigate('/host/login')
  };
  return (
    
    <HelmetProvider>
    {
      <Helmet>
      <link rel="stylesheet" href="/css/congo.css" />
                <title>Host-HomeAway</title>
      </Helmet>
    }
      <a href="/p10h">
        <i className="fas fa-arrow-left button" id="prev"></i>
      </a>
      <div className="subContainer">
        <div className="popup" id="popup">
          <img src="/images/congo-1.jpg" alt="Congrats" />
          <h2>Congratulations!</h2>
          <p>Your listing is successful. Thanks!</p>
          <form action="/congo" method="post" onSubmit={handleFormSubmit}>
            <button type="submit">OK</button>
               {/* <a href="/p12h"><button type="button">OK</button></a>  */}
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Congo;