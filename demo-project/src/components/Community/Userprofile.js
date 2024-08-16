import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, followOrUnfollowUser } from '../../actions/userActions';
import { toast } from "react-toastify";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.following);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?._id;

  const [isFollowing, setIsFollowing] = useState(currentUser?.following.includes(user?._id));

  const followOrUnfollowHandler = async () => {
    await dispatch(followOrUnfollowUser(user?._id, isFollowing, currentUserId));
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className="user-profile d-flex justify-content-between align-items-center mx-3 my-2">
      <div className="d-flex align-items-center">
        <img
          src={user?.avatar[0]?.url || "https://via.placeholder.com/40"}
          width="40"
          height="40"
          className="img-fluid rounded-circle me-2"
          alt={`${user?.firstName} ${user?.lastName}`}
        />
        <div>
          <h6 className="fs-6 fw-semibold">{user?.firstName} {user?.lastName}</h6>
          <p className="text-small fw-normal text-secondary">@{user?.username}</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className={`btn rounded-5 px-3 ${isFollowing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
          onClick={followOrUnfollowHandler}
          disabled={loading}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
