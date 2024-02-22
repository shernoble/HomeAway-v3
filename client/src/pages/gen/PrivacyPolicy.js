import React from "react";
import { HelmetProvider } from 'react-helmet-async';
import { GuestHeader } from "../../components/guestHeader/GuestHeader";
import { Footer } from "../../components/Footer2/GFooter";
import { GuestNav } from "../../components/guestNavbar/GuestNav";

export function PrivacyPolicy() {
    return(
        <HelmetProvider>
            <GuestHeader/>
            <GuestNav/>
            <div>
                <h1 style={{textAlign: 'center', marginBottom: '30px'}}>Privacy Policy</h1>
                <p>HomeAway exists to help build connections between people and make the world more open and inclusive. In short—to build a world where anyone can belong anywhere. We are a community built on trust. A fundamental part of earning that trust means being clear about how we use your information and protecting your human right to privacy.</p>
                <p>This Privacy Policy describes how HomeAway, Inc. and its affiliates (“we,” “us,” or “HomeAway”), process personal information in relation to your use of the HomeAway Platform. Depending on where you live and what you are doing on the HomeAway Platform, the supplemental privacy pages listed below may apply to you. Please follow the links and review the supplemental information describing how we process personal information for those regions and services.</p>
            </div>
            <Footer/>
        </HelmetProvider>
    );
};