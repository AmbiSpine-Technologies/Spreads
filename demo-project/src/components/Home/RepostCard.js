import React, { useEffect, useRef, useState } from 'react';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { BsChat } from "react-icons/bs";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { IoArrowRedoSharp } from "react-icons/io5";

import "./Repost.css";
import ColonCard from '../Post/ColonCard.jsx';

function RepostCard({ repost, onRepost }) {
  const [colon, setColon] = useState(false);
  const colonRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(20000);

  const handleLike = () => {
    setLiked(!liked);
    setCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
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

  const repostUser = {
    author: 'Rupendra',
    email: 'rupendra@gmail.com',
    title: 'Entrepreneur',
    content: "It’s ok to need a little something extra to kick start your efforts sometimes. Finding motivation when you need it is often an important step to higher achievement",
    image: 'https://th.bing.com/th/id/OIP.G12T_MUuIKWw7XklDIqzhwHaE8?rs=1&pid=ImgDetMain',
    time: '2h'
  };

  const handleRepost = () => {
    onRepost(repostUser);
  }
  
  return (
    <div className='cards w-100 h p-2 bg-white mb-2 '>
      <div className="profile-contents mt-4 ms-2">
        <div className="profile-headings ">
          <div className="imgBox">
            <img src={repostUser.image} alt=""/>
          </div>
          <div className="titles ms-2">
            <div className="subtitles">
              <div className="d-flex">
                <h4>{repostUser.author}</h4>
              </div>
              <div className="d-flex">
                <BsFillCheckCircleFill className="circle-icons"/>
                <span className='badge text-bg-light text-small'><BsPlusCircleDotted/> : {repostUser.time}</span>
              </div>
            </div>
            <div className="small-titles">
              <span>{repostUser.email}</span>
              <span>{repostUser.title}</span>
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
      <div className="profile-sup-content">
        <p className='ms-2'>Certainly! Here's 1 1000-word easy on the topic of artificial intelligence
          artificial intelligence: A Journey into the Future</p>
        <a href="#" className="see">...See More</a>
      </div>
      <div className="Repost-card-container mx-2">
         <div className='border border-2 border-secondary rounded-3 mx-2 mt-2'>
         <div className="profile-contents mt-2 ms-2">
        <div className="profile-headings">
          <div className="imgBox">
            <img src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg" alt=""/>
          </div>

          <div className="titles">
            <div className="subtitles">
              <div className="d-flex">
                <h4>{repost.author}</h4>
              </div>
              <div className="d-flex">
                <BsFillCheckCircleFill className="circle-icons"/>
                <span className='badge text-bg-light text-small'><BsPlusCircleDotted/> : 2h</span>
              </div>
            </div>
            <div className="small-titles">
              <span>{repost.email}</span>
              <span>{repost.title}</span>
            </div>
          </div>
         </div>   
       </div>

         <div className="profile-sup-content ms-2">
          <p>{repost.content}</p>
             <a href="#" className="see">...See More</a>
        </div>
        <div className='repost-media'>
        <img src={repost.image} alt="" />

        </div>
         </div>   
        <div className="share-card">
          <div className="share-icons">
            <div className="s-icon" onClick={handleLike} style={{ cursor: 'pointer' }}>
              {liked ? (
                <GoHeartFill 
                  className="icons" 
                  style={{ color: 'red' }} 
                />
              ) : (
                <GoHeart
                  className="icons" 
                  style={{ color: 'black' }} 
                />
              )}
              <span>{count.toLocaleString()}</span>
            </div>
            <div className="s-icon"  data-bs-toggle="modal" data-bs-target="#exampleModal">
              <BsChat className="icons"/>
              <span>20k</span>
            </div>

            {/* -- Modal -- */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <textarea class="form-control rounded-0" placeholder='Your comment..' id="message-text"></textarea>
                      </div>
                      <div class="mb-3 text-center">
                        <button type="button" class="btn btn-primary rounded-0 w-100">Comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="s-icon">
              <PiArrowsClockwiseBold className="icons" onClick={handleRepost}/>
              <span>30k</span>
            </div>
          </div>
          <div className="share-icons">
            <div className="s-icon">
              <IoArrowRedoSharp className="icons"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepostCard;



// import React, { useState, useEffect, useRef } from 'react';
// import { GoHeartFill, GoHeart } from "react-icons/go";
// import { BsChat } from "react-icons/bs";
// import { PiArrowsClockwiseBold } from "react-icons/pi";
// import { BsFillCheckCircleFill, BsPlusCircleDotted } from "react-icons/bs";
// import { IoArrowRedoSharp } from "react-icons/io5";
// import { BiDotsVerticalRounded } from "react-icons/bi";
// import ColonCard from './ColonCard';
// import './Repost.css';

// function RepostCard({ repost }) {
//   const [colon, setColon] = useState(false);
//   const colonRef = useRef(null);
//   const [liked, setLiked] = useState(false);
//   const [count, setCount] = useState(20000);

//   const handleLike = () => {
//     setLiked(!liked);
//     setCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
//   };

//   const handleColon = () => {
//     setColon(!colon);
//   };

//   const handleClickOutside = (event) => {
//     if (colonRef.current && !colonRef.current.contains(event.target)) {
//       setColon(false);
//     }
//   };

//   useEffect(() => {
//     if (colon) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("mousewheel", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("mousewheel", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("mousewheel", handleClickOutside);
//     };
//   }, [colon]);

//   return (
//     <div className='cards w-100 h p-2 bg-white mb-2'>
//       <div className="profile-contents mt-4">
//         <div className="profile-headings">
//           <div className="imgBox">
//             <img src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg" alt="" />
//           </div>
//           <div className="titles">
//             <div className="subtitles">
//               <div className="d-flex">
//                 <h4>{repost.author}</h4>
//               </div>
//               <div className="d-flex">
//                 <BsFillCheckCircleFill className="circle-icons" />
//                 <span className='badge text-bg-light text-small'><BsPlusCircleDotted /> : {repost.time}</span>
//               </div>
//             </div>
//             <div className="small-titles">
//               <span>{repost.email}</span>
//               <span>{repost.title}</span>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="position-relative" ref={colonRef}>
//             <BiDotsVerticalRounded className="icons" onClick={handleColon} />
//             {colon && (
//               <div className='position-absolute' style={{ marginLeft: "-13.9rem", zIndex: "1000", marginTop: "-3.6rem" }}>
//                 <ColonCard />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="profile-sup-content ms-2">
//           <p>Certainly! Here's 1 1000-word easy on the topic of artificial intelligence
//              artificial intelligence: A Journey into the Future</p>
//              <a href="#" className="see">...See More</a>
//         </div>
//         <div className='repost-media'>
//         <img src="https://static4.depositphotos.com/1000816/446/i/450/depositphotos_4463055-stock-photo-handshake-isolated-in-office.jpg" alt="" />

//         </div>
//         <div className="share-card">
//           <div className="share-icons">
//             <div className="s-icon" onClick={handleLike} style={{ cursor: 'pointer' }}>
//               {liked ? (
//                 <GoHeartFill 
//                   className="icons" 
//                   style={{ color: 'red' }} 
//                 />
//               ) : (
//                 <GoHeart
//                   className="icons" 
//                   style={{ color: 'black' }} 
//                 />
//               )}
//               <span>{count.toLocaleString()}</span>
//             </div>
//             <div className="s-icon"  data-bs-toggle="modal" data-bs-target="#exampleModal">
//               <BsChat className="icons"/>
//               <span>20k</span>
//             </div>


//           <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-body">
//                   <form>
//                     <div className="mb-3">
//                       <textarea className="form-control rounded-0" placeholder='Your comment..' id="message-text"></textarea>
//                     </div>
//                     <div className="mb-3 text-center">
//                       <button type="button" className="btn btn-primary rounded-0 w-100">Comment</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="s-icon">
//             <PiArrowsClockwiseBold className="icons" />
//             <span>30k</span>
//           </div>
//         </div>
//         <div className="share-icons">
//           <div className="s-icon" style={{ cursor: 'pointer' }}>
//             <IoArrowRedoSharp className="icons" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RepostCard;

