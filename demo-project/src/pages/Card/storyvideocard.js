import "./videocard.css";
import React from "react";

export default function StoryVideoCard({ videoSrc }) {
  return (
    <div className="video-container">
      <div className="card cards border rounded-2 border-1 p-1">
        <div className="position-relative mini-top px-1">
          <video autoPlay loop muted className="video-full-cover">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="text-center story-body">
            <img src="person.jpeg" id="storyicon" alt="storyicon" className="border border-white" />
            <h5 className="mt-3 text-capitalize fs-6 fw-normal text-white">@im.aditya.shivastava</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
