// components/ChangePassword.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const passwords = {
      oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword
    };

    dispatch(changePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <div className="modal-body p-4">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control rounded-0"
            id="oldPassword"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control rounded-0"
            id="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control rounded-0"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="modal-footer">
          <button 
            type="submit" 
            className="btn btn-success btn-sm rounded-0"
            disabled={loading}
          >
            Change
          </button>
          <button 
            type="button" 
            className="btn btn-danger btn-sm rounded-0" 
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
