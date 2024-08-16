import React, { useState } from 'react';
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoIosAddCircleOutline, IoMdWifi } from "react-icons/io";
import { NavLink } from "react-router-dom";
import CreatePost from '../../components/Post/Create-Post/CreatePost.jsx';
import EventCard from '../../components/Event/EventCard';
import "./profile.css";
import { useSelector } from 'react-redux';

const ProfileCard = () => {  
  const { user } = useSelector((state) => state.user); 

  return (
    <div className='profile-container'>
      <div className='card m-3' style={{ height: '115vh' }}>
        <div className='card-headers'>
          <div className='background-imag'>
            <img src={user?.avatar[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"} alt="Background" />
          </div>
          <div className="profile-headings d-flex p-2">
            <div className="logos">
              <img src={user?.avatar[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"}
               width="70%" height="70%" alt="Profile" />
            </div>
            <div className="titles">
              <NavLink to="/profile" className="text-decoration-none">
                <div className="justify-content-center align-items-center d-flex gap-3">
                  <h4 className='fs-6 text-secondary'>{user?.firstName} {user?.lastName}</h4>
                  <VscVerifiedFilled className="circle-icons text-primary fs-6" />
                </div>
              </NavLink>
              <div className='badge text-bg-light'>
                <span className='text-muted' style={{ fontSize: '0.6rem' }}>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='d-flex position-relative justify-content-center align-items-center w-100'>
            <button className="btn btn-primary btn-sm p-1 w-75 rounded rounded-1 mt-1 mb-1"
            type="button"  
            data-bs-toggle="modal" 
            data-bs-target="#switchUserModal"
             style={{ height: "25px" }}>
              Switch
            </button>
          </div>
          <div>
            <p className='text-muted' style={{ fontSize: '0.8rem', marginBottom: '-1px',textTransform:"capitalize" }}>
            {user?.bio}
            </p>
            <div className='badge text-bg-light'>
              <span className='text-muted' style={{ fontSize: '0.6rem' }}>{user?.username}</span>
            </div>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <IoMdWifi className='icons me-1 text-primary' />
              <span style={{ fontSize: '0.9rem', fontWeight: '400', color: 'gray' }}>Creator Mode</span>
            </div>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
            </div>
          </div>

          <div className='mt-4 profileSidebar'>
            <nav>
              <ul>
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-house-door-fill b-icon"></span>Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/explore" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-search b-icon"></span>Explore
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/message" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-chat-dots b-icon"></span>Messages
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/create-post" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-person-video2 b-icon"></span>Spread Shorts
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="#" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-person-video2 b-icon"></span>Spread Live
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="#" 
                    data-bs-toggle="modal" 
                    data-bs-target="#createEvent" 
                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                  >
                    <span className="bi bi-calendar2-event b-icon"></span>Event
                  </NavLink>
                </li>
              </ul>
              <div className='justify-content-center align-items-center d-flex'>
                <div className="dropdown">
                  <button className="btn btn-primary rounded-0" type="button" data-bs-toggle="modal" data-bs-target="#createModal">
                    Create Post <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </nav>
            {/* --- Modals ---- */}
            <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
              <CreatePost />
            </div>
            <div className="modal fade" id="createEvent" tabIndex="-1" aria-labelledby="createEventLabel" aria-hidden="true">
              <EventCard />
            </div>
            <div 
        className="modal fade" 
        id="switchUserModal" 
        tabIndex="-1" 
        aria-labelledby="switchUserModalLabel" 
        aria-hidden="true"
      >
        <SwitchUser user={user}/>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

function SwitchUser({ user }) {
  return (
        <div className="modal-dialog modal-dialog-centered w-25">
          <div className="modal-content">
            <div className="modal-body">
              <div className='bg-white'>
                <div className="justify-content-center align-items-center text-center d-flex gap-2 rounded-2">
                  <img 
                    src={user?.avatar[0]?.url}
                    className='img-fluid border rounded-circle' 
                    width="40" 
                    height="40" 
                    alt="User Profile" 
                  />
                  <h5 className='fs-6 text-secondary mt-1'>{user?.email}</h5>
                  <VscVerifiedFilled className="circle-icons text-primary fs-6" />
                </div>
                <div className="justify-content-center align-items-center text-center d-flex gap-1 mt-3">
                  <IoIosAddCircleOutline className="fw-light text-black fs-3" />
                  <h6 className='fs-6  mt-2'>Add Another Account</h6>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm rounded-0" 
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  );
}
