import React, { useEffect, useState } from 'react';
import "./matchcard.css";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, followingUpdate, followOrUnfollowUser } from '../../actions/userActions.js';
import { toast } from 'react-toastify';
import axiosInstance from '../../utlis/axios.js';

const ProfileCard = ({ profile }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.following);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?._id;
  const [isFollowing, setIsFollowing] = useState(currentUser?.following.includes(profile?._id));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Action successful');
    }
  }, [dispatch, success, error]);

  const followOrUnfollowHandler = async () => {
    await dispatch(followOrUnfollowUser(profile._id, isFollowing, currentUserId));
    setIsFollowing(!isFollowing);
  };

  const truncatedEmail = profile.email.length > 10 ? `${profile.email.slice(0, 10)}...` : profile.email;

  return (
    <div className="match-card">
      <div className="avatar mt-3">
        <img
          src={profile?.avatar?.[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"}
          alt="Avatar"
        />
      </div>
      <div className="titles ms-2">
        <div className="d-flex">
          <h4>{profile.firstName} {profile.lastName}</h4>
          <VscVerifiedFilled className="circle-icons mt-0" />
        </div>
        <div className="d-flex align-items-center gap-0">
          <span className="badges">@{profile.username}</span>
          <span className="badges">{truncatedEmail}</span>
        </div>
        <div className='mt-1'>
          <p className='me-1 fw-semibold' style={{ fontSize: "0.7rem" }}>
            {profile.bio}
          </p>
          <div className='mt-0'>
            <button 
              onClick={followOrUnfollowHandler}
              className={`btn rounded-5 px-2 btn-sm ${isFollowing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
              disabled={loading}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ title, data }) => {
  const [expand, setExpand] = useState(false);
  const previewCardCount = 2;

  return (
    <div className='match-container'>
      <div className='card p-1 border-0'>
        <h6 className='card-title'>{title}</h6>
        {expand ? data.map(profile => (
          <ProfileCard key={profile._id} profile={profile} />
        )) : data.slice(0, previewCardCount).map(profile => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
        <a href="#" className="text-decoration-none ms-2 mb-2" onClick={(e) => { e.preventDefault(); setExpand(!expand); }}>
          {expand ? 'See less' : 'See more'}
        </a>
      </div>
    </div>
  );
};

export default MatchCard;
