import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl = process.env.PUBLIC_URL + '/imgs/frontpage_bk.jpg';

export function FirstPage() {
  const [showBox, setShowBox] = useState(false);

  const handleJoinClick = () => {
    setShowBox(true);
  };

  const handleModalClose = () => {
    setShowBox(false);
  };

  return (
    <div>
      {/* <Helmet>
        <link rel="stylesheet" href="/css/FrontPage.css" />
      </Helmet> */}

      <div className="background-image-container" style={{ backgroundImage: `url(${backgroundImageUrl})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', filter: 'brightness(50%)'}}>
        </div>

        <div className='text' style={{position: 'absolute', top: 250, left: 300}}>
        <h1 style={{ fontSize: '4em', color: '#44AABB', fontWeight: 'bold', marginTop: '0px', textShadow: '6px 6px 6px rgba(0, 0, 0, 0.5)',  padding: '10px'}}>Welcome to HOME AWAY!</h1>
        <button className="btn" onClick={handleJoinClick} style={{ marginTop: '10px', marginLeft: '320px', backgroundColor: '#008080', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '1.2em',
            transition: 'background-color 0.3s ease',}}
            onMouseOver={(e) => e.target.style.backgroundColor = '#418d77'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#008080'}>
          Get Started
        </button>

        <div className={`modal ${showBox ? 'show' : ''}`} style={{ display: showBox ? 'block' : 'none' , bottom: '250', right: '250'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{paddingLeft: "180px", fontSize: '2em', color: '#333', fontWeight: 'bold'}}>Join As</h5>
                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
              <div className="dropdown dropend" style={{marginBottom: "20px", marginTop: "10px"}}>
                <button type="button" id="admin" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#008080', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '80px'}}>
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
                <button type="button" id="guest" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#008080', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '80px'}}>
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

              <div className="dropdown dropend" style={{marginBottom: "40px"}}>
                <button type="button" id="host" className="btn dropdown-toggle" data-bs-toggle="dropdown" style={{backgroundColor: '#008080', color: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '80px'}}>
                  Host
                </button>
                <div className="dropdown-menu">
                  <Link to="/host/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link to="/host/register" className="dropdown-item">
                    Signup
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
