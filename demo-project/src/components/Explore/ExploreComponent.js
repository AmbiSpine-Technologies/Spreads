import React, { Fragment, useState } from 'react';
import Main_Left from './Main_Left';
import Main_Right from './Main_Right';
import { AiFillAudio, AiOutlineRise } from "react-icons/ai";
import { IoOptionsOutline } from "react-icons/io5";
import StoryVideoCard from './../../pages/Card/storyvideocard';
import VideoCard from './../../pages/Card/videocard';
import "./../../pages/Card/videocard.css";
import AudioCard from "./../../pages/Card/AudioCard";

const btns = [
  { id: 1, title: "Trending" },
  { id: 2, title: "Reels" },
  // { id: 3, title: "Post" },
  { id: 4, title: "Audios" },
  { id: 5, title: "Videos" },
];

const ExploreComponent = ({ scrollableContentRef }) => {
  const [activeButton, setActiveButton] = useState('Trending');

  return (
    <Fragment>
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-3">
            <Main_Right />
          </div>

          <div className="col-6 bg-white scrollable-content" ref={scrollableContentRef}>
            <div className='mt-3 mini-top'>
              <form className="p-2 w-100 justify-content-between align-items-center border border-1 d-flex mini-top" style={{ background: "rgb(196, 236, 222)" }}>
                <input
                  type="text"
                  placeholder="Search.."
                  className='w-100 border-0 bg-transparent'
                  style={{ outline: "none" }}
                />
                <div className="d-flex">
                  <IoOptionsOutline className="fs-6" />
                  <AiFillAudio className="me-4 fs-6" />
                </div>
              </form>
              <div className="w-100 mt-2 d-flex justify-content-between align-items-center">
                {btns.map((item) => (
                  <button 
                    key={item.id} 
                    className={`btn ${activeButton === item.title ? 
                      'btn-primary' : 'btn-light'} w-25 fw-semibold me-1 btn-sm`}
                    onClick={() => setActiveButton(item.title)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="content mt-3">
              {activeButton === 'Trending' && (
                <div className="trending">
                  <h3 className="fs-6">
                    <AiOutlineRise className="fs-3 fw-bold text-primary" />
                    <span className="ms-3">AI</span>
                  </h3>
                  <h3 className="fs-6">
                    <AiOutlineRise className="fs-3 fw-bold text-primary" />
                    <span className="ms-3">India is going to create history</span>
                  </h3>
                  <h3 className="fs-6">
                    <AiOutlineRise className="fs-3 fw-bold text-primary" />
                    <span className="ms-3">Now we gonna create history</span>
                  </h3>
                  <h3 className="fs-6">
                    <AiOutlineRise className="fs-3 fw-bold text-primary" />
                    <span className="ms-3">Atmanirbhar Bharat</span>
                  </h3>
                  <h3 className="fs-6">
                    <AiOutlineRise className="fs-3 fw-bold text-primary" />
                    <span className="ms-3">Clean India, Healthy India</span>
                  </h3>
                </div>
              )}
              {activeButton === 'Reels' && <div className='d-flex video-container justify-content-around align-items-center flex-wrap'>
                <StoryVideoCard videoSrc="story1.mp4" />
                <StoryVideoCard videoSrc="story1.mp4" />
                <StoryVideoCard videoSrc="story1.mp4" />
                <StoryVideoCard videoSrc="story1.mp4" />
                <StoryVideoCard videoSrc="story1.mp4" />
                <StoryVideoCard videoSrc="story1.mp4" />
                </div>}
             
              {activeButton === 'Audios' && <div className="d-flex justify-content-around align-items-center flex-wrap video-container">
                 
                    <AudioCard
                      imageSrc="ambi.jpeg"
                      audioSrc="town.mp3"
                      title="town is peaceful "
                    /> 
                    <AudioCard
                    imageSrc="ambi.jpeg"
                    audioSrc="sweet.mp3"
                    title="town is peaceful "
                  /> 
                  <AudioCard
                  imageSrc="ambi.jpeg"
                  audioSrc="plumbus.mp3"
                  title="town is peaceful "
                /> 
                <AudioCard
               imageSrc="ambi.jpeg"
                audioSrc="air.mp3"
                title="air is the best origin "
              />
              <AudioCard
              imageSrc="ambi.jpeg"
              audioSrc="town.mp3"
              title="town is peaceful "
            /><AudioCard
           imageSrc="ambi.jpeg"
            audioSrc="town.mp3"
            title="town is peaceful "
          />
                  
                </div>}
              {activeButton === 'Videos' && <div className='video-container'>
              
            <VideoCard
              Comname="Mai mujhe bhulunga nhi"
              text="Main Rang Sharbaton Ka-Slowed+Reverb| Use Headphones"
              videoSrc="video1.mp4"
            />
            <VideoCard
              Comname="Champian Laut aaye"
              text="Main Rang Sharbaton Ka-Slowed+Reverb| Use Headphones"
              videoSrc="video2.mp4"
            />
            <VideoCard
              Comname="Sea is the beautiful"
              text="Main Rang Sharbaton Ka-Slowed+Reverb| Use Headphones"
              videoSrc="video3.mp4"
            />
            <VideoCard
              Comname="Champian Laut aaye"
              text="Main Rang Sharbaton Ka-Slowed+Reverb| Use Headphones"
              videoSrc="video2.mp4"
            />
            <VideoCard
              Comname="Sea is the beautiful"
              text="Main Rang Sharbaton Ka-Slowed+Reverb| Use Headphones"
              videoSrc="video3.mp4"
            />

                </div>}
            </div>
          </div>

          <div className="col-3">
            <Main_Left />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ExploreComponent;



