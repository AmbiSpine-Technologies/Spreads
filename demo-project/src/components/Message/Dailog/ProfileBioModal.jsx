import React, { Fragment, useState } from 'react';
import { TiPlus } from "react-icons/ti";
import { LiaEdit } from "react-icons/lia";
import './bio.css';

const ProfileBioMadal = () => {
  const [groupName, setGroupName] = useState("Group Name");

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  return (
    <Fragment>
      <button
        className='btn btn-sm fw-semibold w-25 me-1'
        data-bs-toggle="modal"
        data-bs-target="#messageModal"
      >
        BIO
      </button>
      <div className="ProfileBioMad">
        <div
          className="modal fade"
          id="messageModal"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-2 mt-2">
              <div className="text-center mx-2">
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                  className="img-fluid border border-2 bg-secondary border-secondary rounded-circle"
                  alt="img profile"
                  width="100"
                  height="100"
                />
                <div>
                  <h2 style={{ marginTop: "-30px", marginLeft: "55px" }}>
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                      <TiPlus />
                    </label>
                  </h2>
                  <input type="file" id="fileInput" style={{ display: 'none' }} />
                  <div className="text-center mx-auto d-flex gap-0 justify-content-center align-content-center">
                    <input
                      type="text"
                      className=" text-center w-50 border-0 border-bottom  bg-transparent fw-semibold"
                      value={groupName}
                      onChange={handleGroupNameChange}
                    />
                    <LiaEdit className="ms-1 fs-4" />
                  </div>
                </div>
                <div className='mx-4 mt-3'>
                  <form>
                    <textarea
                      className="form-control outline-none"
                      placeholder="Write Bio Here"
                      rows="3"
                      style={{ resize: 'none' }}
                    ></textarea>
                  </form>
                </div>
              </div>
              <div className="modal-footer" style={{ border: 'none' }}>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  data-bs-dismiss="modal"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileBioMadal;
