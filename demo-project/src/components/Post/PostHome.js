import React, { useState, useRef } from 'react';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { BsFillCheckCircleFill, BsPlusCircleDotted } from "react-icons/bs";
import { BiDotsVerticalRounded, BiComment } from "react-icons/bi";
import { MdOutlineThumbUp, MdShare } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { likePost, restLikePost, unlikePost } from '../../actions/postAction.js';
import CreateComent from './Comment/CreateComent.jsx';
import ColonCard from './ColonCard';
import { useOutsideClick } from '../../utlis/useOutsideClick.js';
import { toast } from 'react-toastify';

function PostHome({ posts }) {
  const [colon, setColon] = useState(false);
  const [expands, setExpands] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const colonRef = useRef(null);
  const textCount = 100;
  const dispatch = useDispatch();


  const { user } = useSelector(state => state.user);
  const userId = user?._id;


  const isLiked = posts?.likes?.includes(userId);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(posts._id));
      toast.info('Post unliked!');
    } else {
      dispatch(likePost(posts._id));
      toast.success('Post liked!');
    }
    dispatch(restLikePost());
  };


  const handleColon = () => {
    setColon(!colon);
  };

  useOutsideClick(colonRef, () => setColon(false));

  const handleShare = () => {
    const url = `${window.location.origin}/post/${posts._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post!',
        url: url
      }).then(() => {
        toast.success('Post shared successfully!');
      }).catch((err) => {
        toast.error('Failed to share post');
      });
    } else {
      navigator.clipboard.writeText(url)
        .then(() => toast.success('Post URL copied to clipboard!'))
        .catch(err => toast.error('Failed to copy URL'));
    }
  };

  return (
    <div className='card w-100 h p-2 bg-white mb-2'>
      <div className="profile-contents mt-4">
        <div className="profile-headings">
          <div className="imgBox">
            <img src={posts?.author?.avatar} alt="Profile" />
          </div>
          <div className="titles">
            <div className="subtitles">
              <div className="d-flex">
                <h4>{posts?.author?.name}</h4>
              </div>
              <div className="d-flex">
                <BsFillCheckCircleFill className="circle-icons" />
                <span className='badge text-bg-light text-small'>
                  <BsPlusCircleDotted /> : <TimeAgo date={posts?.createdAt} />
                </span>
              </div>
            </div>
            <div className="small-titles">
              <span>{posts?.author?.email}</span>
              <span>{posts?.author?.username}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="position-relative" ref={colonRef}>
            <BiDotsVerticalRounded className="icons" onClick={handleColon} />
            {colon && (
              <div className='position-absolute' style={{ marginLeft: "-13rem", zIndex: "1000", marginTop: "-3.6rem" }}>
                <ColonCard handleShare={handleShare} postId={posts._id} post={posts} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-sub-content">
        <p className='mt-2 text-muted' style={{fontSize:"0.9rem",fontFamily:"cursive"}}>{expands ? posts?.content : posts?.content?.slice(0, textCount)}</p>
        <a href="#" className="text-decoration-none ms-2 mb-2" onClick={(e) => { e.preventDefault(); setExpands(!expands); }}>
          {expands ? 'See less' : 'See more'}
        </a>
      </div>
      <div className="d-flex justify-content-center flex-column">
        {posts?.images && posts.images.length > 0 && (
          <img src={posts.images[0].url} alt="Content" />
        )}
        <div className='d-flex justify-content-between align-items-center mt-1 p-1'>
          <div className='d-flex gap-1 align-items-center'>
            {isLiked ? (
              <GoHeartFill style={{ color: 'red' }} onClick={handleLike} />
            ) : (
              <GoHeart onClick={handleLike} />
            )}
            <span><MdOutlineThumbUp className='fs-5' /> <span>{posts?.likes.length}</span></span>
          </div>
          <div className='d-flex gap-1 align-items-center'>
            <NavLink to={`comment/${posts?._id}`} className="text-decoration-none fs-6">
              <span className='text-muted text-small'>{posts?.comments?.length} comments</span>
            </NavLink>
            <span className='text-muted text-small'>1 share</span>
          </div>
        </div>
        <hr />
        <div className='d-flex justify-content-between align-items-center p-2'>
          <div>
            {isLiked ? (
              <BiSolidLike onClick={handleLike} className='fs-5' />
            ) : (
              <MdOutlineThumbUp onClick={handleLike} className='fs-5'/>
            )}
          </div>
          <div onClick={() => setCommentBox(!commentBox)} className='d-flex align-items-center'>
            <BiComment className='fs-5' />
            <span className='text-muted fs-6'>comments</span>
          </div>
          <div className='d-flex align-items-center'>
            <MdShare onClick={handleShare} className='fs-5' />
            <span className='text-muted fs-6'>Share</span>
          </div>
        </div>
      </div>
      {commentBox && (
        <CreateComent postId={posts?._id}/>
      )}
    </div>
  );
}

export default PostHome;
