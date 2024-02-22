import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
import { Footer } from '../../components/Footer2/GFooter';

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

    console.log('Form submitted:', formData);
    // Here you can add code to send the form data to your backend or do other operations
  };

  return (
    <HelmetProvider>
      <Helmet>
        {/* You can add meta tags or other headers here if needed */}
      </Helmet>
      <GuestHeader/>
      <GuestNav/>

      <div className="container" style={{ minHeight: 'calc(83.75vh - 80px - 56px)' }}> {/* 80px for header, 56px for navbar */}
        <div className="row">
          {/* <div className="col-md-6">
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
            <button onClick={() => window.history.back()} className="btn btn-secondary">Go Back</button>
          </div> */}

          <div className="col-md-6">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <h1 className="title" style={{ fontSize: '40px' }}>
                Contact us
              </h1>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Username"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <input type="submit" value="Send" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </HelmetProvider>
  );
}
