import React, { useState } from 'react';
import { HiCheckBadge } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import './title.css';

const Title = ({user}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNotify = () => {
    setNotificationOpen((prev) => !prev);
  };

  return (
   <header className='d-flex justify-content-between p-2 bg-white border headers'>
 <div className='d-flex gap-2 justify-content-center align-items-center'>
        <img
          src={user.avatar[0].url || 'https://randomuser.me/api/portraits/men/1.jpg'}
          width='50'
          height='50'
          className='rounded rounded-5 border'
          alt='Profile'
        />
        <span className='text-black fs-5 fw-semibold'>{user.firstName} {user.lastName}</span>
        <HiCheckBadge className='text-primary fs-5 fw-semibold' />
      </div>
      
      <div className='position-relative'>
        <button
          className='btn outline-none border-0'
          onClick={handleNotify}
        >
          <i className='bi bi-info-circle fs-4'></i>
        </button>
        {notificationOpen && (
          <div className='custom-dropdown'>
            <div className="form-check form-switch d-flex justify-content-between">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                defaultChecked
              />
               <label className="form-check-label me-4" htmlFor="flexSwitchCheckChecked">
                Notification
              </label>
            </div>
            <ul className='list-group'>
              <li className='list-group-item'>
                <NavLink to=''>
                  Block
                </NavLink>
              </li>
              <li className='list-group-item'>
                <NavLink to=''>
                  Delete Chat
                </NavLink>
              </li>
              <li className='list-group-item'>
                <NavLink to=''>
                  Report
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
   </header>
  );
};

export default Title;
