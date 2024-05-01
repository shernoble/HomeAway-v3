import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import {AmenitiesCheckbox} from '../../components/AmenitiesCheckbox/AmenitiesCheckbox';


const P6h = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState({
    o1: false,
    o2: false,
    o3: false,
    o4: false,
    o5: false,
    o6: false,
    o7: false,
    o8: false,
    o9: false,
    o10: false,
    o11: false,
    o12: false,
  });

  const handleCheckboxChange = (id) => {
    setIsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedCheckboxes = Object.keys(isChecked)
    .filter((key) => isChecked[key])
    .map((key) => key); // Extract keys (IDs) of selected checkboxes
  const amenitiesLabels = selectedCheckboxes.map((key) => {
    // Map each key to its corresponding label
    switch (key) {
      case 'o1':
        return 'Kitchen';
      case 'o2':
        return 'Tv';
      case 'o3':
        return 'Wifi';
      case 'o4':
        return 'Ac';
      case 'o5':
        return 'Washing Machine';
      case 'o6':
        return 'Parking Area';
      case 'o7':
        return 'Pool';
      case 'o8':
        return 'Hot Tub';
      case 'o9':
        return 'Exercise Equipment';
      case 'o10':
        return 'First Aid';
      case 'o11':
        return 'Smoke Alarm';
      case 'o12':
        return 'Fire Extinguisher';
      // Add cases for other checkboxes
      default:
        return ''; // Handle the default case
    }
  });
    if (selectedCheckboxes.length > 0) {
      dispatch({ type: 'UPDATE_AMENITIES', payload: amenitiesLabels });
      navigate('/host/p7h'); 
    } else {
      alert('Check at least one checkbox');
    }
  };

  const handleBack = () => {
    navigate('/host/p5h');
  };

  return (
    <HelmetProvider>
    {
      <Helmet>
                <link rel="stylesheet" href="/css/all.css" />
                <link rel="stylesheet" href="/css/p6h.css" />
                <title>Host-HomeAway</title>
            </Helmet>
    }
        <div className="navbar header">
          <h2 style={{ textDecoration: 'none' }} className="heading1">
            Home Away
          </h2>
        </div>
        <form action="/p6h" method="post" onSubmit={handleFormSubmit}>
          <div className="bg-img">
            <h3 style={{ fontSize: '30px', marginTop: '0px', padding: '12px' }}>
              What amenities can you provide to guests
            </h3>
            <div className="a1">
            <AmenitiesCheckbox
              id="1"
              label="Kitchen"
              isChecked={isChecked.o1}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/kitchen.jpg"
              altText="kitchen"
            />
            <AmenitiesCheckbox
              id="2"
              label="Tv"
              isChecked={isChecked.o2}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/tv.jpg"
              altText="tv"
            />
            <AmenitiesCheckbox
              id="3"
              label="Wifi"
              isChecked={isChecked.o3}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/wifi.jpg"
              altText="wifi"
            />
            </div>
            <div className="a2">
              
            <AmenitiesCheckbox
              id="4"
              label="AC"
              isChecked={isChecked.o4}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/ac.jpg"
              altText="ac"
            />
            <AmenitiesCheckbox
              id="5"
              label="Washing machine"
              isChecked={isChecked.o5}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/wm.jpg"
              altText="wm"
            />
            <AmenitiesCheckbox
              id="6"
              label="Parking Area"
              isChecked={isChecked.o6}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/parking.jpg"
              altText="parking"
            />
            </div>
            <div className="a3">
            <AmenitiesCheckbox
              id="7"
              label="Pool"
              isChecked={isChecked.o7}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/pool.jpg"
              altText="pool"
            />
            <AmenitiesCheckbox
              id="8"
              label="Hot Tub"
              isChecked={isChecked.o8}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/hottub.jpg"
              altText="hottub"
            />
            <AmenitiesCheckbox
              id="9"
              label="ExerciseEquipment"
              isChecked={isChecked.o9}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/exercise.jpg"
              altText="exercise"
            />
            </div>
            <h3 style={{fontSize:'30px'}}>Do you have any of these Safety items?</h3>
            <div className="a4">
              
            <AmenitiesCheckbox
              id="10"
              label="First Aid"
              isChecked={isChecked.o10}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/firstaid.jpg"
              altText="firstaid"
            />
            <AmenitiesCheckbox
              id="11"
              label="Smoke Alarm"
              isChecked={isChecked.o11}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/smalarm.jpg"
              altText="smalarm"
            />
            <AmenitiesCheckbox
              id="12"
              label="Fire Extinguisher"
              isChecked={isChecked.o12}
              handleCheckboxChange={handleCheckboxChange}
              imageSrc="/images/fe.jpg"
              altText="fe"
            />
            </div>
            <hr style={{marginTop:'45px'}}/>
            <div>
              <div>
                <button className="c1" type="button" onClick={handleBack}>Back</button>
              </div>
              <div>
                <button type="submit" className="cnt">
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
    </HelmetProvider>
  );
};

export default P6h;
