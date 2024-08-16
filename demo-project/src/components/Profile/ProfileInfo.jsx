import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./profileInfo.css";
import ChangePassword from "./ChangePassword";

const ProfileInfo = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      <div className="profileContainer">
        <div className="profileDetails">
          <h1>My Profile</h1>
          {user?.avatar && (
            <img
              src={user?.avatar[0]?.url}
              alt={user.firstName}
              className="profileImage"
            />
          )}
          <Link to="/me/update" className="editProfileButton">
            Edit Profile
          </Link>
        </div>
        <div className="profileInfo">
          <div className="infoItem">
            <h4>Full Name</h4>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="infoItem">
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>
          <div className="infoItem">
            <h4>Username</h4>
            <p>{user?.username}</p>
          </div>
          <div className="infoItem">
            <h4>Joined On</h4>
            <p>{user?.createdAt ? String(user.createdAt).substr(0, 10) : ""}</p>
          </div>
          <div className="infoItem">
            <h4>My Address</h4>
            <p>{user?.address}</p>
          </div>
          <div className="changePasswordLink">
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#changePasswordModal"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePasswordModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ChangePassword user={user} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileInfo;
