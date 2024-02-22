import React, { useState } from 'react';
import axios from "axios";
import { GuestHeader } from '../../components/guestHeader/GuestHeader';
import { Footer } from '../../components/Footer2/GFooter';
import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GuestNav } from '../../components/guestNavbar/GuestNav';

export function UserReportForm() {
    const [report,setReport]=useState({
        category:'host complaint',
        subject:null,
        description:'',
    });
    const [message, setMessage] = useState(null);
    const user=useSelector(state => state.auth.user);
    
    const handleSubmit=async(event) => {
        event.preventDefault();
        // const reportMessage=document.getElementById('report-message');
        // post it to backend
        const response=await axios.post("/guest/report",{report:report,user:user});
        console.log(response.data);
        if(!response.data.success){
            // report not submitted
            console.log(response.data.err);
            setMessage("an error occured while submitting report, please try again!:");
        }
        else{
            // success
            // display success msg
            console.log("report submitted");
            setMessage("report submission successfull!!");
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
        <GuestNav/>
        {message && (
                <div className={`mt-3 alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {message}
                </div>
        )}
        {/* <div className="alert" id="report-message"></div> */}
        <div className="container mt-5">
        <h1 className="text-center">Guest Report Form</h1>
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


