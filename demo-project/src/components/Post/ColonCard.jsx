import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkPost, clearErrors, followOrUnfollowUser, resetBookmarkPost } from '../../actions/userActions';
import { markNotInterested } from '../../actions/postAction';
import { toast } from 'react-toastify';
import "./post.css"
function ColonCard({ handleShare, postId, post }) {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.bookmark);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?._id;
  const [isFollowing, setIsFollowing] = useState(currentUser?.following.includes(post?.postedBy?._id));
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (success) {
      setIsBookmarked(!isBookmarked);
      dispatch(resetBookmarkPost());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const handleBookmark = () => {
    dispatch(bookmarkPost(postId, currentUserId));
  };

  const handleNotInterested = () => {
    dispatch(markNotInterested(postId));
  };

  const followOrUnfollowHandler = async () => {
    await dispatch(followOrUnfollowUser(post?.postedBy?._id, isFollowing, currentUserId));
    setIsFollowing(!isFollowing);
  };

  return (
    <Fragment>
      <div className='card p-3 colon-card' style={{ width: "250px" }}>
        <ul className='list-unstyled gap-3'>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center' onClick={handleBookmark}>
              <i className={`bi ${isBookmarked ? "bi-bookmark-fill" : "bi-bookmark"} me-2 fs-6`}></i>
              <span>{isBookmarked ? "Remove Bookmark" : "Save"}</span>
            </button>
          </li>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center' onClick={handleNotInterested}>
              <i className="bi bi-x me-2 fs-5"></i>
              <span>Not Interested</span>
            </button>
          </li>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center' onClick={followOrUnfollowHandler}>
              <i className={`bi ${isFollowing ? "bi-person-check" : "bi-person-plus"} me-2 fs-5`}></i>
              <span>{!isFollowing ? "Follow" : "Unfollow"}</span>
            </button>
          </li>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center' onClick={() => handleShare(postId)}>
              <i className="bi bi-link-45deg me-2 fs-5"></i>
              <span>Copy link</span>
            </button>
          </li>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center'>
              <i className="bi bi-code me-2 fs-5"></i>
              <span>Embed Post</span>
            </button>
          </li>
          <li className='mb-2'>
            <button className='fw-normal fs-6 text-secondary d-flex align-items-center'>
              <i className="bi bi-exclamation-circle me-2 fs-5"></i>
              <span>Report</span>
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ColonCard;
