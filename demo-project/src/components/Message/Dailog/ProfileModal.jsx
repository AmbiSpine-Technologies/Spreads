import React from 'react';
import './network.css';
import { useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import { FaUserAlt, FaCalendarAlt } from 'react-icons/fa';
import { RiMapPinUserLine } from "react-icons/ri";

const ProfileModal = () => {
  const { user, loading, error } = useSelector(state => state.user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="modal-dialog modal-dialog-centered" id="Network">
      <div className="modal-content bg-dark text-white">
        <div className="modal-body">
          <div className="d-flex flex-column align-items-center">
            <p className='fs-5 fw-bold text-white mb-3'>Your Profile</p>
            <div className='d-flex flex-column align-items-center mb-3'>
              <img src={user.avatar[0].url} alt="Avatar" className='rounded-circle profile-avatar' />
              <div className="text-center mt-3">
                <p className="mb-1 text-white" style={{fontSize:"0.9rem"}}>{user.bio}</p>
                <p className="text-secondary text-small text-center">BIO</p>
              </div>
            </div>
            <div className='profile-info d-flex flex-column align-items-center'>
              <div className='profile-info-item mb-2'>
                <p style={{fontSize:"0.9rem"}}>< RiMapPinUserLine className="me-2 "/>{user.username}</p>
                <p className="text-secondary text-small text-center">Username</p>
              </div>
              <div className='profile-info-item mb-2'>
                <p style={{fontSize:"0.9rem"}}><FaUserAlt className="me-2" />{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-secondary text-small text-center">Name</p>
              </div>
              <div className='profile-info-item '>
                <p style={{fontSize:"0.9rem"}}><FaCalendarAlt className="me-2"/>{moment(user.createdAt).format('MMMM YYYY')}</p>
                <p className="text-secondary text-small text-center">Joined</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
