import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import "./job.css"
import { GiCheckMark } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";

const JobComponent = () => {
  return (
    <Fragment>
    <div className='d-flex justify-content-center flex-column align-items-center bg-white '
     style={{width:"1340px"}}>
    <nav className='d-flex justify-content-between  align-items-center w-100 p-1'>
        <div className='ms-4'>
          <img src="ambis.jpeg" alt="Job Portal Logo" width="120" className='' />
        </div>
        <div className='d-flex align-items-center gap-3'>
          <h1 className='fw-bold fs-2'>Job Portal</h1>
          <div className='check-sign'>
            <GiCheckMark className='icon fs-4 text-white'/>
          </div>
        </div>
        <div className='d-flex justify-content-arround'>
          <Link to="/" className='text-decoration-none me-4 text-secondary ms-2s fw-light fs-6'>
            Home</Link>
          <Link to="/service" 
          className='text-decoration-none me-4 text-secondary ms-2 fw-light fs-6'>Service</Link>
          <Link to="/about"
          className='text-decoration-none me-4 text-secondary ms-2 fw-light fs-6'>About Us</Link>
          <Link to="/contact"
          className='text-decoration-none me-4 text-secondary ms-2 fw-light fs-6'>Contact</Link>
          <Link to="/more"
          className='text-decoration-none me-4 text-black  fw-bold  fs-3 ms-4'
          style={{marginTop:'-15px'}}><HiDotsHorizontal/></Link>
        </div>
      </nav>
      <section className='d-flex justify-content-between  align-items-center w-75 gap-5'>
        <div className='me-4'>
          <h4 className='fw-bold fs-4 mt-4 mb-4'>For Job Seekers</h4>
          <div>
            <ul>
              <li>
                <strong>Job Search:</strong>
                Allows users to search for job openings based on various criteria such as location, industry, job title, and keywords.
              </li>
              <li>
                <strong>Resume/CV Creation:</strong>
                Provides tools to create and upload resumes or CVs for job applications.
              </li>
              <li>
                <strong>Job Alerts:</strong>
                Enables users to set up alerts for new job postings matching their criteria.
              </li>
              <li>
                <strong>Profile Creation:</strong>
                Allows users to create profiles with their professional and educational information.
              </li>
              <li>
                <strong>Application Tracking:</strong>
                Helps users keep track of the jobs they have applied for and their application status.
              </li>
              <li>
                <strong>Career Advice/Resources:</strong>
                Offers articles, tips, and resources to help users with job searching, resume writing, interview preparation, etc.
              </li>
            </ul>
          </div>
        </div>
        <div className='me-4'>
          <h4 className='fw-bold fs-4 mt-4 mb-4'>For Employer Recruiters</h4>
          <div>
            <ul>
              <li>
                <strong>Job Posting:</strong>
                Allows employers to post job openings and specify job requirements.
              </li>
              <li>
                <strong>Resume Database Access:</strong>
                Provides access to a database of resumes/CVs to search for potential candidates.
              </li>
              <li>
                <strong>Applicant Tracking System (ATS):</strong>
                Helps manage the entire recruitment process, from receiving applications to hiring.
              </li>
              <li>
                <strong>Candidate Screening Tools:</strong>
                Offers tools to screen and filter applicants based on specified criteria.
              </li>
              <li>
                <strong>Employer Branding:</strong>
                Provides features to showcase the company culture, values, and benefits to attract top talent.
              </li>
              <li>
                <strong>Analytics and Reporting:</strong>
                Offers insights into the performance of job postings and recruitment efforts.
              </li>
            </ul>
            <p>
              These are just some of the common services offered by job portals. The specific features and services may vary depending on the platform.
            </p>
          </div>
        </div>
      </section>
    </div>
    </Fragment>
  );
}

export default JobComponent;
