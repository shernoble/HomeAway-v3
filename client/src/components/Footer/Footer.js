import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    const footerStyle = {
        // width: '100%',
        backgroundColor: '#557571',
        textAlign: 'center',
        padding: '10px',
    };
    const linkStyle = {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#000',
    };

  return (
    <footer style={footerStyle}>
        <h3>Home Away</h3>
        <nav>
        <Link to="/ContactUs" style={linkStyle}>Contact Us</Link>
        <Link to="/AboutUs" style={linkStyle}>About Us</Link>
        <Link to="/Faq" style={linkStyle}>FAQ</Link>
    </nav>
  </footer>
  );
}

export default Footer;