import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { Footer } from "../../components/Footer2/GFooter";
import { GuestNav } from '../../components/guestNavbar/GuestNav';

const styles = {
    container: {
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    section: {
        marginBottom: '40px',
    },
    subHeading: {
        marginBottom: '20px',
    },
    article: {
        fontSize: '16px',
        lineHeight: '1.6',
    },
};

export function TermsOfService() {
    return (
        <HelmetProvider>
            <GuestHeader />
            <GuestNav/>
            <div style={styles.container}>
                <h1 style={styles.heading}>Terms of Service</h1>
                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Guest Terms</h2>
                    <article style={styles.article}>
                        <h4 style={styles.subHeading}>1. Searching and Booking</h4>
                        <p>You can search for Host Services by using criteria like the type of Host Service, type of listing, travel destination, travel dates, and number of guests. You can also use filters to refine your search results. Search results are based on their relevance to your search and other criteria.</p>
                        <p>When you book a Listing, you are agreeing to pay all charges for your booking including the Listing price, applicable fees like service fee, offline fees, taxes and any other items identified during checkout. In addition to these Terms, you will be subject to, and responsible for complying with, all terms of the Reservation, including without limitation, the cancellation policy and any other rules, standards, policies, or requirements identified in the Listing or during checkout that apply to the Reservation. It is your responsibility to read and understand these rules, standards, policies, and requirements prior to booking a Listing</p>
                    </article>
                    <article>
                        <h4 style={styles.subHeading}>2. Your Responsibilities</h4>
                        <p>You are responsible for your own acts and omissions and are also responsible for the acts and omissions of anyone you invite to join or provide access to any Accommodation, all areas and facilities where the Accommodation is located that the Host and Guest are legally entitled to use in connection with the Accommodation (“Common Areas”), or any Experience or other Host Service. For example, this means: (i) you are responsible for leaving an Accommodation (and related personal property) or Common Areas in the condition it was in when you arrived, (ii) you are responsible for paying all reasonable Damage Claim amounts, and (iii) you must act with integrity, treat others with respect and comply with applicable laws at all times.</p>
                    </article>
                </section>
                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Host Terms</h2>
                    <article style={styles.article}>
                        <h4 style={styles.subHeading}>1. Hosting</h4>
                        <p>As a Host, we offer you the right to use our Platform in accordance with these Terms to share your Accommodation, Experience, or other Host Service with our vibrant community of Guests - and earn money doing it. It’s easy to create a Listing and you are in control of how you host - set your price, availability, and rules for each Listing.</p>
                    </article>
                    <article>
                        <h4 style={styles.subHeading}>2. Managing Your Listing</h4>
                        <p>Our Platform provides tools that make it easy for you to set up and manage a Listing. Your Listing must include complete and accurate information about your Host Service, your price, other charges like cleaning fees, resort fees, offline fees, and any rules or requirements that apply to your Guests or Listing. You are responsible for your acts and omissions as well as for keeping your Listing information (including calendar availability) and content (like photos) up-to-date and accurate at all times.</p>
                    </article>
                </section>
                <section style={styles.section}>
                    <h2 style={styles.subHeading}>General Terms</h2>
                    <article style={styles.article}>
                        <h4 style={styles.subHeading}>HomeAway Platform Rules</h4>
                        <p>You must follow these rules and must not help or induce others to break or circumvent these rules.</p>
                        <ul>
                            <li>Act with integrity and treat others with respect</li>
                            <li>Only use our Platform as authorized by these Terms or another agreement with us</li>
                            <li>Honor your legal obligations</li>
                        </ul>
                    </article>
                </section>
            </div>
            <Footer />
        </HelmetProvider>
    );
};