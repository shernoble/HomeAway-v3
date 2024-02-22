
import React from 'react';
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { GuestNav } from '../../components/guestNavbar/GuestNav';
// import { Footer } from '../../components/Footer/Footer';
import { Footer } from '../../components/Footer2/GFooter';

export function FAQ(){

    const bgImageStyle = {
        // backgroundImage: `url('/imgs/pexels-julia-filirovska-4913769.jpg')`,
        // backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
    };

    const accordionStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '0px',
    };

    return (
        <>
        <GuestHeader/>
        <GuestNav/>
        <div style={bgImageStyle}>       
            <div className="faq_area section_padding_130" id="faq">
                <div className="container" style={{ width: '1000px' }}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 col-lg-6">
                            <div className="section_heading text-center wow fadeInUp">
                                <h3>Frequently Asked Questions</h3>
                                <p>TEXT</p>
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-lg-8" style={accordionStyle}>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How much does HomeAway charge for hosts and guests?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Most Hosts pay a flat service fee of 3% of the booking subtotal. The subtotal is your nightly price plus any optional fees you charge guests, such as a cleaning fee, and it doesn’t include Airbnb fees and taxes. Guests typically pay a service fee of around 14% of the booking subtotal.
                                        </div>
                                    </div>
                                </div>    
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Is my home or apartment a good fit for HomeAway?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            You can offer a private or shared room in your home or an entire place, which guests will have to themselves. The key is to set clear expectations because when guests book on HomeAway, they want to know what they’ll be getting. It’s essential to indicate in your listing the exact type of property that you’re offering—a house, apartment, boutique hotel, or a unique space like a treehouse, yurt, sailboat, a windmill, etc. 
                                        </div>
                                    </div>
                                </div>    
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How is it safe?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>Profiles and reviews</strong><br/>Since Hosts and guests can only review each other after a reservation is complete, you can be confident that the feedback you’re reading is based on actual experiences.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            How do I contact customer support
                                        </button>
                                    </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        The quickest way to conatct HomeAway and receive a quick response is via Twitter or Instagram : simply write a message and you will receive an answer within a few minutes.
                                    </div>
                                </div>
                            </div>                        
                            </div>
                        </div>
                    </div>
                    <div className="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp">
                        <p className="mb-0 px-2">Can't find your answers?</p>
                        <a href="/ContactUs" style={{ color: '#92BA92', textDecoration: 'underline' }}> Contact us</a>
                    </div>
                    <button onClick={() => { window.history.back() }} className="btn btn-light mt-3">Go Back</button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

