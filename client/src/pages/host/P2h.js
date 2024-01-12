import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {PlaceOptions} from '../../components/PlaceOptions/PlaceOptions';
import {Helmet,HelmetProvider} from "react-helmet-async";

function P2h() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [buttonStyle, setButtonStyle] = useState({
    background: '#ccccce',
    color: 'black',
    cursor: 'not-allowed',
  });
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    setButtonStyle({
      background: 'black',
      color: 'white',
      cursor: 'pointer',
    });
  };

  const checkRadio = () => {
    var radios = document.getElementsByName("option");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    return false;
  };

  const handleBack = () => {
    navigate('/host/p1h');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRadio()) {
      navigate('/host/p3h'); 
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
                <link rel="stylesheet" href="/css/p2h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
            }
      <div className="navbar header">
        <h2 style={{ textDecoration: 'none' }} className="heading1">
          Home Away
        </h2>
      </div>
      <form action="/p2h" method="post" onSubmit={(e) => handleSubmit(e, checkRadio)}>
        <div className="bg-img">
          <h1 style={{ fontSize: '45px', marginTop: '0px', padding: '12px' }}>
            Which of these describe your place
          </h1>
          <PlaceOptions selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
        </div>
        <hr />
        <div>
          <div>
            <button className="c1" type="button" onClick={handleBack}>
              Back
            </button>
          </div>
          <div>
            <button type="submit" className="c2" style={buttonStyle} onClick={checkRadio}>
              Next
            </button>
          </div>
        </div>
      </form>
    </HelmetProvider>
  );
}

export default P2h;
