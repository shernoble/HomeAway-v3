// AmenitiesCheckbox.js
import React from 'react';

export function AmenitiesCheckbox({ id, label, isChecked, handleCheckboxChange, imageSrc, altText }) {
  return (
    <div className={isChecked ? 'myDivChecked dv' : 'dv'} id={`cb${id}`}>
      <img src={imageSrc} width="50px" height="50px" style={{ marginTop: '10px', marginLeft: '30px' }} alt={altText} /><br />
      <input
        type="checkbox"
        id={`o${id}`}
        name="chkboxs[]"
        value={label}
        checked={isChecked}
        onChange={() => handleCheckboxChange(`o${id}`)}
      />
      <label>{label}</label>
    </div>
  );
};

