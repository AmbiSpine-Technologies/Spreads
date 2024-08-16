import { VscVerifiedFilled } from "react-icons/vsc";
import "./follow.css";
import React, { useState } from "react";

const ProfileCards = ({ profile }) => {
  const { avatar, firstName, lastName, username, email } = profile;

  const displayEmail = email ? (email.length > 10 ? `${email.slice(0, 10)}...` : email) : "N/A";

  return (
    <div className="follow-card d-flex align-items-left">
      <div className="avatar mt-2">
        <img
          src={avatar?.[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"}
          alt={`${firstName || "Unknown"} ${lastName || "User"}'s avatar`}
        />
      </div>
      <div className="subtitle">
        <div className="d-flex align-items-center">
          <h4 style={{ fontSize: "0.8rem", margin: 0 }}>
            {firstName} {lastName}
          </h4>
          <VscVerifiedFilled
            className="text-primary ms-2 me-2"
            style={{ fontSize: "0.9rem" }}
          />
        </div>
        <div className="d-flex justify-content-start">
          <span className="badges">{username || "Unknown"}</span>
          <span className="badges ms-2">{displayEmail}</span>
        </div>
      </div>
    </div>
  );
};

const FollowCard = ({ data }) => {
  const [expands, setExpands] = useState(false);
  const itemsToShow = expands ? data : data?.slice(0, 5);

  return (
    <div className="follow-container">
      <div className="card">
        <div className="card-body">
          <h5 className="f-content">
            <strong>Recommended</strong>
          </h5>
          <div className="w-100">
            {itemsToShow?.length > 0 ? (
              itemsToShow.map((profile, index) => (
                <ProfileCards key={index} profile={profile} />
              ))
            ) : (
              <p>No profiles available</p>
            )}
          </div>
        </div>
        <a
          href="#"
          className="text-decoration-none ms-2 mb-2"
          onClick={(e) => {
            e.preventDefault();
            setExpands(!expands);
          }}
        >
          {expands ? "See less" : "See more"}
        </a>
      </div>
    </div>
  );
};

export default FollowCard;
