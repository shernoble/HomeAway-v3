import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AddressForm} from '../../components/AddressForm/AddressForm';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';


function P4h() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    };
    dispatch({ type: 'UPDATE_STREET', payload: formData.street });
    dispatch({ type: 'UPDATE_CITY', payload: formData.city });
    dispatch({ type: 'UPDATE_FLAT', payload: formData.flat});
    dispatch({ type: 'UPDATE_STATE', payload: formData.state});
    dispatch({ type: 'UPDATE_COUNTRY', payload: formData.country });
    dispatch({ type: 'UPDATE_PINCODE', payload: formData.code});
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
             <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
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