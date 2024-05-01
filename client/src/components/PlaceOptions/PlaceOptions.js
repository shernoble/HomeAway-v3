import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import {useDispatch} from 'react-redux';

export function PlaceOptions({ navigateLink,title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBack = () => {
    navigate('/host/p1h');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption) {
      try {
        dispatch({ type: 'UPDATE_PROPERTY_TYPE', payload: selectedOption });

        
        navigate(navigateLink);
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, display an error message, or perform any other action
      }
    } else {
      alert('Please select an option.');
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="stylesheet" href="/css/all.css" />
        <link rel="stylesheet" href="/css/p2h.css" />
        <title>Host-HomeAway</title>
      </Helmet>
      <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-img">
          <h1 style={{ fontSize: '45px', marginTop: '0px', padding: '12px' }}>
            Which of these describe your place
          </h1>

          <div className="c3">
            <div>
              <img src="/images/img1.jpg" alt="House img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op1"
                name="option"
                value="House"
                checked={selectedOption === 'House'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op1" style={{ fontSize: '22px' }}>
                House
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img2.jpg" alt="Flat img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op2"
                name="option"
                value="Flat"
                checked={selectedOption === 'Flat'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op2" style={{ fontSize: '22px' }}>
                Flat
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img3.jpg" alt="Cabin img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op3"
                name="option"
                value="Cabin"
                checked={selectedOption === 'Cabin'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op3" style={{ fontSize: '22px' }}>
                Cabin
              </label>
              <br />
            </div>
          </div>
          <div className="c4">
            <div>
              <img src="/images/img4.jpg" alt="Cave img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op4"
                name="option"
                value="Cave"
                checked={selectedOption === 'Cave'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op4" style={{ fontSize: '22px' }}>
                Cave
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img5.jpg" alt="Container img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op5"
                name="option"
                value="Container"
                checked={selectedOption === 'Container'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op5" style={{ fontSize: '22px' }}>
                Container
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img6.jpg" alt="Boat img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op6"
                name="option"
                value="Boat"
                checked={selectedOption === 'Boat'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op6" style={{ fontSize: '22px' }}>
                Boat
              </label>
              <br />
            </div>
          </div>
          <div className="c5">
            <div>
              <img src="/images/img7.jpg" alt="Farm House img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op7"
                name="option"
                value="Farm House"
                checked={selectedOption === 'Farm House'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op7" style={{ fontSize: '22px' }}>
                Farm House
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img8.jpg" alt="Castle img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op8"
                name="option"
                value="Castle"
                checked={selectedOption === 'Castle'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op8" style={{ fontSize: '22px' }}>
                Castle
              </label>
              <br />
            </div>
            <div>
              <img src="/images/img9.jpg" alt="Tree House img" width="120px" height="120px" style={{ marginTop: '3px' }} />
              <br />
              <input
                type="radio"
                id="op9"
                name="option"
                value="Tree House"
                checked={selectedOption === 'Tree House'}
                onChange={handleOptionChange}
              />
              <label htmlFor="op9" style={{ fontSize: '22px' }}>
                Tree House
              </label>
              <br />
            </div>
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
            <button
              type="submit"
              className="c2"
              style={{
                background: selectedOption ? 'black' : '#ccccce',
                color: selectedOption ? 'white' : 'black',
                cursor: selectedOption ? 'pointer' : 'not-allowed',
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </HelmetProvider>
  );
}

export default PlaceOptions;
