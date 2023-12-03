import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exp = /^\d{10}$/;
    if (!exp.test(formData.phone)) {
      alert('Phone number should contain 10 digits');
      return;
    }

    // console.log('Form submitted:', formData);
  };

  return (

    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="/css/ContactUs.css" />
      </Helmet>

    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <img
        src="/imgs/pexels-vinta-supply-co-_-nyc-842948.jpg"
        style={{ position: 'absolute', width: '100%', height: '100%',
        objectFit: 'cover',}}
        height="100%"
        width="100%"
        alt="background"
      />
      <p></p>

      <div className="container">
        <div className="contact-info">
          <h1 className="title" style={{ fontSize: '30px' }}>
            Let's get in touch
          </h1>

          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <Link href="#" style={{ backgroundImage: 'url("/imgs/Facebook.png")' }}></Link>
              <Link href="#" style={{ backgroundImage: 'url("/imgs/Twitter.png")' }}></Link>
              <Link href="#" style={{ backgroundImage: 'url("/imgs/Instagram.png")' }}></Link>
              <Link href="#" style={{ backgroundImage: 'url("/imgs/Linkedin.png")' }}></Link>
            </div>
          </div>

          <p className="text"></p>
          <button onClick={() => window.history.back()}>Go Back</button>

        </div>

        <div className="contact-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="title" style={{ fontSize: '40px' }}>
              Contact us
            </h1>
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Username"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="tel"
                name="phone"
                className="input"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="input-container textarea">
              <textarea
                name="message"
                className="input"
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};
