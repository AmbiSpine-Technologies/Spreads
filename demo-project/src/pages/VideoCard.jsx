import React, { useState } from 'react';
import './VideoCard.css'; 

const VideoCard = () => {
  const [showContent, setShowContent] = useState(false);
  const videoUrl ="https://youtu.be/HCDVN7DCzYE"
  const title ="Earth 101 | National Geographic"
  const content="This video was more depressing than enlightening.Words can't even express how lucky we are to even exist. And yet look at how we treat the only place sustainable for life in the galaxy."
  return (
    <div className="card p-2 video-card">
      <div className="video-container">
      <video src={videoUrl} className='card-img-top img-fluid'
       controls autoplay loop muted />
        <div className='card-title'>
        <h4>{title}</h4>
        </div>
      <div className="card-body">
            <p>{content}</p>
          </div>
      </div>
    </div>
  );
};

export default VideoCard;
