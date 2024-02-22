import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    html: {
        height: '100%',
    },
    body: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
    },
    footer: {
        backgroundColor: '#557571',
        textAlign: 'center',
        padding: '10px',
        marginTop: 'auto',
        width: '100%',
    },
    linkStyle: {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#000',
    },
    icons: {
        margin: '0 10px',
        fontSize: '24px',
        textDecoration: 'none',
        color: '#000',
    },
};

export function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );

            if (height <= window.innerHeight) {
                footerRef.current.style.position = 'fixed';
                footerRef.current.style.bottom = 0;
            } else {
                footerRef.current.style.position = 'static';
                footerRef.current.style.bottom = null;
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <footer ref={footerRef} style={styles.footer}>
            <h3>Home Away</h3>
            <nav>
                <a href="/ContactUs" style={styles.linkStyle}>Contact Us</a>
                <a href="/AboutUs" style={styles.linkStyle}>About Us</a>
                <a href="/FAQ" style={styles.linkStyle}>FAQ</a>
                <a href="/TermsOfService" style={styles.linkStyle}>Terms of Service</a>
                <a href="/PrivacyPolicy" style={styles.linkStyle}>Privacy Policy</a>
                <div className="social-icons">
                    <Link href="#" style={styles.icons}><i className="fa-sharp fa-brands fa-facebook"></i></Link>
                    <Link href="#" style={styles.icons}><i className="fa-sharp fa-brands fa-twitter"></i></Link>
                    <Link href="#" style={styles.icons}><i className="fa-sharp fa-brands fa-instagram"></i></Link>
                    <Link href="#" style={styles.icons}><i className="fa-sharp fa-brands fa-linkedin"></i></Link>
                </div>
            </nav>
        </footer>
    );
}