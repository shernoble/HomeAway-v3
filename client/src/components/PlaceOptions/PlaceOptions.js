import React from 'react';

export function PlaceOptions({ selectedOption, handleOptionChange }){
  return (
    <div>
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
  );
}

