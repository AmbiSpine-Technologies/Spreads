import React, { useState } from 'react';
import './network.css';

const AddUserModal = ({ onClose, onInvite }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    onInvite({ email, message });
    setEmail('');
    setMessage('');
    onClose(); // Close modal after inviting
  };

  return (
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{background:"#fff",zIndex:0}}>
          <div className="modal-header">
            <h5 className="modal-title">Invite User</h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                placeholder='Enter Email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Invitation Message</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows="3" 
                 placeholder='Enter message'
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleInvite}>Invite</button>
          </div>
        </div>
      </div>
  );
};

export default AddUserModal;
