import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

function P3h() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    const [buttonStyle, setButtonStyle] = useState({
      background: '#ccccce',
      color: 'black',
      cursor: 'not-allowed',
    });
    const handleOptionChange = (value) => {
      setSelectedOption(value);
  
      setButtonStyle({
        background: 'black',
        color: 'white',
        cursor: 'pointer',
      });
    };
  
    const checkRadio = () => {
      var radios = document.getElementsByName("btn");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    return false;
    };
  
    const handleBack = () => {
      navigate('/host/p2h');
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (checkRadio()) {
        dispatch({ type: 'UPDATE_ROOM_TYPE', payload: selectedOption });
        navigate('/host/p4h');
      }
      else{
        alert('Please select an option.');
      }
    };

  return (
    <HelmetProvider>
    {
            <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p3h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            }
        <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
      <form action="/p3h" method="post" onSubmit={(e) => handleSubmit(e, checkRadio)}>
        <div className="bg-img">
          <h1 style={{ fontSize: '45px', marginTop: '0px', padding: '12px' }}>
            What type of place guests can be offered
          </h1>
          <div className="wc">
            <div className="lc" id="bt1" onClick={() => handleOptionChange('Entire Place')} style={{ backgroundColor: selectedOption === 'Entire Place' ? '#557571' : '' }}>
              <img src="/images/er.png" width="100px" height="100px" alt="Entire Place" />
              <div>
                <input
                  type="radio"
                  name="btn"
                  id="a1"
                  value="Entire Place"
                  checked={selectedOption === 'Entire Place'}
                  onChange={() => handleOptionChange('Entire Place')}
                />
                <label htmlFor="a1">Entire Place</label>
              </div>
              <p>Guests have the entire place for themselves to stay.</p>
            </div>

            <div className="cc" id="bt2" onClick={() => handleOptionChange('Private Room')} style={{ backgroundColor: selectedOption === 'Private Room' ? '#557571' : '' }}>
              <img src="/images/pr.png" width="100px" height="100px" alt="Private Room" />
              <div>
                <input
                  type="radio"
                  id="a2"
                  name="btn"
                  value="Private Room"
                  checked={selectedOption === 'Private Room'}
                  onChange={() => handleOptionChange('Private Room')}
                />
                <label htmlFor="a2">Private Room</label>
              </div>
              <p>Guests sleep in a private room but some areas may be shared with others or with you.</p>
            </div>

            <div className="rc" id="bt3" onClick={() => handleOptionChange('Shared Room')} style={{ backgroundColor: selectedOption === 'Shared Room' ? '#557571' : '' }}>
              <img src="/images/sr.jpg" width="100px" height="100px" alt="Shared Room" />
              <div>
                <input
                  type="radio"
                  id="a3"
                  name="btn"
                  value="Shared Room"
                  checked={selectedOption === 'Shared Room'}
                  onChange={() => handleOptionChange('Shared Room')}
                />
                <label htmlFor="a3">Shared Room</label>
              </div>
              <p>Guests sleep in a room or common area that may be shared with others.</p>
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
            <button type="submit" className="cr" style={buttonStyle} onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
      </form>
    </HelmetProvider>
  );
};

export default P3h;
