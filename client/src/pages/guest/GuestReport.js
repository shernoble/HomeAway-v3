import React, { useState } from 'react';
import axios from "axios";
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { Footer } from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export function UserReportForm() {
    const [report,setReport]=useState({
        category:'host complaint',
        subject:null,
        description:'',
    });
    const user=useSelector(state => state.auth.user);
    
    const handleSubmit=(event) => {
        event.preventDefault();
        // post it to backend
        const response=axios.post("/guest/report",{report:report,user:user});
        if(response.err){
            // display err
            console.log(response.err);
        }
        else{
            // success
            // display success msg
            console.log("report submitted");
            setReport({
                category:'host complaint',
                subject:null,
                description:''
            });
        }
    }

    return (
        <HelmetProvider>
        <Helmet>
            <title>Report-Guest</title>
        </Helmet>
        <GuestHeader/>
        <div className="container mt-5">
        <h1 className="text-center">User Report Form</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="category" className="form-label">
                Category
            </label>
            <select
                className="form-select"
                id="category"
                name="category"
                value={report.category}
                onChange={e => {setReport({...report,category:e.target.value})}}
            >
                <option value="host_complaint">Host Complaint</option>
                <option value="others">Others</option>
            </select>
            </div>
            {report.category === 'others' && (
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                Subject
                </label>
                <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={report.subject}
                onChange={e => {setReport({...report,subject:e.target.value})}}
                />
            </div>
            )}
            <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description
            </label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                value={report.description}
                onChange={e => {setReport({...report,description:e.target.value})}}
                required
            ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
            Submit
            </button>
        </form>
        </div>
        <Footer/>
        </HelmetProvider>
    );
}


