import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {AddressForm} from '../../components/AddressForm/AddressForm';
import { Helmet,HelmetProvider } from 'react-helmet-async';


function P4h() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: '',
    flat: '',
    city: '',
    state: '',
    code: '',
    country: 'India', 
  });
  const isFormValid = Object.values(formData).every(value => value);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid =
      formData.street.trim() !== '' &&
      formData.flat.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      /^\d{6}$/.test(formData.code.trim()); 
    if (!isValid) {
      alert(
        "Please fill in all the required fields with valid data, and ensure the pincode is a 6-digit number."
      );
      return;
    }
    navigate('/host/p5h'); 
  };

  const handleBack = () => {
    navigate('/host/p3h');
};

  return (
    <HelmetProvider>
    {
            <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p4h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            }
    <AddressForm
      formData={formData}
      handleChange={handleChange}
      handleFormSubmit={handleFormSubmit}
      handleBack={handleBack}
      isFormValid={isFormValid}
    />
    </HelmetProvider>
  );
}

export default P4h;