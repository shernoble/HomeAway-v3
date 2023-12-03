import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const backgroundImageUrl = process.env.PUBLIC_URL + '/imgs/FP.jpg';

function FirstPage() {
  const [showBox, setShowBox] = useState(false);

  const handleJoinClick = () => {
    setShowBox(true);
  };

  const handleModalClose = () => {
    setShowBox(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="/css/frontPage.css" />
      </Helmet>

      <div className="background-image-container" style={{ backgroundImage: `url(${backgroundImageUrl})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '4em', color: '#333', fontWeight: 'bold', marginTop: '220px', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)' }}>Welcome to HOME AWAY!</h1>
        <button className="btn" onClick={handleJoinClick} style={{ marginTop: '10px', marginRight: '2px', backgroundColor: '#51BB93', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '1.2em',
            transition: 'background-color 0.3s ease',}}
            onMouseOver={(e) => e.target.style.backgroundColor = '#418d77'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#51BB93'}>
          Get Started
        </button>

        <div className={`modal ${showBox ? 'show' : ''}`} style={{ display: showBox ? 'block' : 'none' , top: 'auto', left: 'auto'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{paddingLeft: "180px", fontSize: '2em', color: '#333', fontWeight: 'bold'}}>Join As</h5>
                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
              <div className="dropdown dropend" style={{marginBottom: "20px", marginTop: "10px"}}>
                <button type="button" id="admin" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#51BB93', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                  Admin
                </button>
                <div className="dropdown-menu">
                  <Link to="/admin/login" className="dropdown-item">
                    Login
                  </Link>
                    <Link to="/admin/register" className="dropdown-item">
                    Signup
                  </Link>
                </div>
              </div>

              <div className="dropdown dropend" style={{marginBottom: "20px"}}>
                <button type="button" id="admin" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#51BB93', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                  Guest
                </button>
                <div className="dropdown-menu">
                  <Link to="/guest/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link to="/guest/register" className="dropdown-item">
                    Signup
                  </Link>
                </div>
              </div>

              <div className="dropdown dropend">
                <button type="button" id="admin" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#51BB93', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
                  Host
                </button>
                <div className="dropdown-menu">
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link to="/register" className="dropdown-item">
                    Signup
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default FirstPage;
