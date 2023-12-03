import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#557571',
        textAlign: 'center',
        padding: '10px',
        // position: 'fixed',
        bottom: '0',
        width: '100%',
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
                <a href="/ContactUs" style={linkStyle}>Contact Us</a>
                <a href="/AboutUs" style={linkStyle}>About Us</a>
                <a href="/FAQ" style={linkStyle}>FAQ</a>
            </nav>
        </footer>
    );
}

export default Footer;