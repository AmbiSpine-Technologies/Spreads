import React, { useEffect, useRef, useState } from 'react';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { BsFillCheckCircleFill, BsPlusCircleDotted } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoArrowRedoSharp } from "react-icons/io5";
import ColonCard from './ColonCard';
import CommentModal from './Comment/Comment.js';
import { MdOutlineThumbUp,MdThumbUp,MdShare } from "react-icons/md";
import { BiComment } from "react-icons/bi";


function PostCard({ onRepost }) {
  
  const [colon, setColon] = useState(false);
  const [expands, setExpands] = useState(false);

  const [count, setCount] = useState(300);
  const [commentModalOpen, setCommentModalOpen] = useState(false);

  const openCommentModal = () => setCommentModalOpen(true);
  const closeCommentModal = () => setCommentModalOpen(false);

  const colonRef = useRef(null);
  const text = "Certainly! Here's 1 1000-word easy on the topic of artificial intelligence artificial intelligence: A Journey into the Future";
  const textCount = 100;

  // const handleLike = () => {
  //   setLiked(!liked);
  //   setCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
  // };
  const handleLike = () => {
    setCount(prevCount => prevCount + 1);
  };


  const handleColon = () => {
    setColon(!colon);
  };

  const handleClickOutside = (event) => {
    if (colonRef.current && !colonRef.current.contains(event.target)) {
      setColon(false);
    }
  };

  useEffect(() => {
    if (colon) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousewheel", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousewheel", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousewheel", handleClickOutside);
    };
  }, [colon]);

  const PostingData = {
    author: 'Aditya Srivastava',
    email: 'xyz@gmail.com',
    title: 'Entrepreneur',
    content: "Certainly! Here's 1 1000-word easy on the topic of artificial intelligence artificial intelligence: A Journey into the Future",
    image: 'https://static4.depositphotos.com/1000816/446/i/450/depositphotos_4463055-stock-photo-handshake-isolated-in-office.jpg',
    time: '2h'
  };

  const handleRepost = () => {  
    onRepost(PostingData);
  };

  return (
    <div className='cards w-100 h p-2 bg-white mb-2'>
      <div className="profile-contents mt-4">
        <div className="profile-headings">
          <div className="imgBox">
            <img src={PostingData.image} alt="" />
          </div>
          <div className="titles">
            <div className="subtitles">
              <div className="d-flex">
                <h4>{PostingData.author}</h4>
              </div>
              <div className="d-flex">
                <BsFillCheckCircleFill className="circle-icons" />
                <span className='badge text-bg-light text-small'><BsPlusCircleDotted /> : {PostingData.time}</span>
              </div>
            </div>
            <div className="small-titles">
              <span>{PostingData.email}</span>
              <span>{PostingData.title}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="position-relative" ref={colonRef}>
            <BiDotsVerticalRounded className="icons" onClick={handleColon} />
            {colon && (
              <div className='position-absolute' style={{ marginLeft: "-13.9rem", zIndex: "1000", marginTop: "-3.6rem" }}>
                <ColonCard />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-sub-content">
        <p>{expands ? text : text.slice(0, textCount)}</p>
        <a href="#"  className="text-decoration-none ms-2 mb-2" onClick={(e) => { e.preventDefault(); setExpands(!expands); }} >
        {expands ? 'See less' : 'See more'}
        </a>
      </div>
      <div className="img-thumbnails">
        <img src={PostingData.image} alt="" />
        <div className='d-flex justify-content-between align-items-center mt-1 p-1'>
          <div className='d-flex gap-1 align-items-center'>
          <GoHeartFill style={{
                    color: 'red',
                  }}/>
          <span><MdThumbUp/>  <span>{count.toLocaleString()}</span></span>
          </div>
          <div className='d-flex gap-1'>
            <span className='text-muted text-small'>1100 comments</span>
            <span className='text-muted text-small'>1 share</span>
          </div>
        </div>
        <hr />
        <div className='d-flex justify-content-between align-items-center mt-1 p-1'>
          <div className='d-flex gap-1 align-items-center'>
          <span><MdOutlineThumbUp/></span>
          </div>
          <div className=''>
            <BiComment/>
            <span className='text-muted text-small'>comments</span>
          </div>
          <div className=''>
            <MdShare/>
            <span className='text-muted text-small'>Share</span>
          </div>
        </div>
        
        <div className="share-card">
          <div className="share-icons">
            <div className="s-icon" onClick={handleLike} style={{ cursor: 'pointer' }}>
            <MdOutlineThumbUp/>
              {/* {liked ? (
                <GoHeartFill
                  className="icons"
                  style={{
                    color: 'red',
                  }}
                />
              ) : (
                <GoHeart
                  className="icons"
                  style={{
                    color: 'black',
                  }}
                />
              )} */}
              {/* <span>{count.toLocaleString()}</span> */}
            </div>
            <div className='s-icon' onClick={openCommentModal}>
              <BsChat className="icons" />
              <span>20k</span>
            </div>
            <div className="s-icon">
              <PiArrowsClockwiseBold className="icons" onClick={handleRepost} />
              <span>30k</span>
            </div>
          </div>
          <div className="share-icons">
            <div className="s-icon" style={{ cursor: 'pointer' }} >
              <IoArrowRedoSharp className="icons" />
            </div>
          </div>
        </div>
      </div>
      {commentModalOpen && (
        <div className="position-absolute" style={{ zIndex: "1000" }}>
          <CommentModal
            isOpen={commentModalOpen}
            onClose={closeCommentModal}
            post={PostingData}
          />
        </div>
      )  
      }
    </div>
  );
}

export default PostCard;
