import React from 'react';
import { VscVerifiedFilled } from "react-icons/vsc";
import "./contact.css";

const ContactProfile = ({ title }) => {
  return (
    <div className="contact-card bg-white p-3">
      <div className="avatar">
        <img
          src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"
          alt="Avatar"
        />
      </div>
      <div className="titles ms-2">
        <div className="d-flex">
          <h4>Adity Shrivastava</h4>
          <VscVerifiedFilled className="circle-icons mt-1" />
        </div>
        <div className="d-flex align-items-center gap-0">
          <span className="badges">@srivastava</span>
          <span className="badges">Entrepreneur</span>
        </div>
        <div className='mt-1'>
          <p className='me-1 fw-semibold' style={{ fontSize: "0.7rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam omnis amet,
            distinctio possimus modi rem suscipit sit dignissimos cupiditate nisi,
          </p>
        </div>
        <div className='followedby d-flex align-items-center gap-0'>
          <div className="avatar d-flex">
            <img
              className='img-1'
              src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"
              alt="Avatar"
            />
            <img
              className='img-2'
              src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"
              alt="Avatar"
            />
            <img
              className='img-3'
              src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"
              alt="Avatar"
            />
          </div>
          <span className="ms-2">Followed by Charli and Deviliers</span>
        </div>
      </div>
      <div className='mt-2'>
        <button className='btn btn-primary btn-sm btn-follow'>
          Follow
        </button>
      </div>
    </div>
  );
}

export default ContactProfile;
