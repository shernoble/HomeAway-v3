import { Link } from 'react-router-dom';

import {Helmet,HelmetProvider} from "react-helmet-async"

function P1h() {
    return (
        <HelmetProvider>
            {
            <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p1h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            }
            <div className="navbar header">
                <h2 style={{ textDecoration: 'none' }} className="heading1">Home Away</h2>
            </div>
            <div className="wp">
                <div className="s1"><img src="/images/image9.png" alt="img9" width="800px" height="500px" style={{ marginLeft: '30px' }} /> </div>
                <div className="s2">
                    <h1 style={{ marginLeft: '180px' }}>Let's Get Started On </h1>
                    <h1 style={{ marginLeft: '240px', marginBottom: '35px', fontSize: '35px', fontStyle: 'italic' }}>Home Away</h1>
                    <h2 style={{ marginLeft: '180px' }}>Create your own Listing</h2>
                    <p style={{ marginLeft: '80px', marginRight: '20px', lineHeight: '30px', fontStyle: 'oblique', fontSize: '16.5px' }}>
                        Here you can give basic information about your home like the type of home, part of the place & amenities you can provide to guests,
                        the location of your place, upload some pictures of your home and give a short title and description of your place, the price per night
                        that you are expecting so that it will help the guests to know better about your place.
                    </p>
                </div>
            </div>
            <hr />
            <Link to="/host/login">
                <input className="c1" type="button" value="Back" />
            </Link>
            <Link to="/host/p2h">
                <input className="c2" type="button" value="Start" />
            </Link>
        </HelmetProvider>
    );
}

export default P1h;