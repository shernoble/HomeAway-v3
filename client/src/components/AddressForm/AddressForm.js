// AddressForm.js
import React from 'react';

export function AddressForm ({ formData, handleChange, handleFormSubmit, handleBack, isFormValid }){
  return (
    <div>
      <h3 style={{ marginLeft: '450px', fontSize: '45px', marginBottom: '0px', height: '20px', marginTop: '30px' }}>
        Enter your address
      </h3>
      <br />
      <br />
      <p style={{ marginLeft: '450px', fontSize: '15px', marginBottom: '30px' }}>
        Your address will be shared with guests after registration
      </p>
      <br />
      <br />
      <form action="/host/p4h" method="post" onSubmit={handleFormSubmit}>
        <div className="main-block" style={{ height: '400px', width: '500px', marginTop: '0px', marginLeft: '480px', padding: '0px' }}>
          <div className="info">
          <p style={{ fontSize: '20px', marginBottom: '5px'}}>Street</p>
            <input
              type="text"
              id="street"
              name="street"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px' }}
             
              onChange={handleChange}
              required
            />
             <p style={{ fontSize: '20px' , marginBottom: '5px' }}>Flat</p>
            <input
              type="text"
              name="flat"
              id="flat"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px' }}
              onChange={handleChange}
              required
            />
             <p style={{ fontSize: '20px', marginBottom: '5px' }}>City</p>
            <input
              type="text"
              name="city"
              id="city"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px'  }}
              onChange={handleChange}
              required
            />
             <p style={{ fontSize: '20px', marginBottom: '5px' }}>State</p>
            <input
              type="text"
              name="state"
              id="state"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px'  }}
              onChange={handleChange}
              required
            />
             <p style={{ fontSize: '20px', marginBottom: '5px' }}>Pinocde</p>
            <input
              type="text"
              name="code"
              id="code"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px'  }}
              onChange={handleChange}
              required
            />
            <p style={{ fontSize: '20px' , marginBottom: '5px'}}>Country</p>
            <input
              type="text"
              name="country"
              id="country"
              style={{ width: '500px', height: '50px', border: '2px solid black', marginBottom: '10px',marginTop: '0px'  }}
              placeholder="Country"
              value="India"
              readOnly
            />
          </div>
        </div>
        <hr />
        <div>
          <div>
            <button className="c1" type="button" onClick={handleBack}>
              Back
            </button>
          </div>
          <div>
            <button className="c2" type="submit" style={{ cursor: isFormValid ? 'pointer' : 'not-allowed', backgroundColor: isFormValid ? 'black' : 'initial', color: isFormValid ? 'white' : 'initial', }} onClick={handleFormSubmit}>
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

