import React from 'react';

export function AboutUs(){
  return (
    <>
      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4" style={{ fontWeight: 'bold' }}>About us</h1>
              <br /><br />
              <p className="lead text-muted mb-0" style={{ fontWeight: 600 }}>We grow businesses by creating experiences people love. </p><br />
              <p className="lead text-muted">Need to get in touch? <a href="/ContactUs" className="text-muted">
                <u>ContactUs</u></a>
              </p>
              <button onClick={() => window.history.back()}>Go Back</button>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img src="/imgs/istockphoto-1360092910-170667a.jpg" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-5">
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <h2 className="font-weight-light">Simple & Reliable</h2>
              <p className="font-italic text-muted mb-4" style={{ paddingTop: '20px' }} >If you want to feel completely at home when you travel, then our website could be just the thing. You get all the creature comforts that come with being in an actual home.</p>
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2" ><img src="/imgs/icon.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-6 mx-auto" style={{ paddingRight: 'px' }} ><img src="/imgs/icon-24-7-support.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
            <div className="col-lg-6">
              <h2 className="font-weight-light">24x7 Support</h2>
              <p className="font-italic text-muted mb-4">Always be there for customers whenever they are in need.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light">Meet our team</h2>
              <p className="font-italic text-muted"></p>
            </div>
          </div>

          <div className="row text-center">
            <TeamMember
              imageSrc="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png"
              name="Kavya Shridhar Lolla"
            />
            <TeamMember
              imageSrc="https://www.alexandrahuang.com/img/prof_avatar.svg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
              name="K Durga Pavani Sai Harshitha"
            />
            <TeamMember
              imageSrc="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
              name="Mekala Sai Swetha"
            />
            <TeamMember
              imageSrc="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
              name="P Rishtih"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const TeamMember = ({ imageSrc, name }) => {
  return (
    <div className="col-xl-4 col-sm-6 mb-5">
      <div className="bg-white rounded shadow-sm py-5 px-4">
        <img src={imageSrc} alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
        <h5 className="mb-0">{name}</h5>
        <ul className="social mb-0 list-inline mt-3">
        </ul>
      </div>
    </div>
  );
}
