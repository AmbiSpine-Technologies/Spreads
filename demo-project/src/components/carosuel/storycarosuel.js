import "./storycarosuel.css";
import StoryVideoCard from "./../../pages/Card/storyvideocard";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function StoryCarosuel() {
  return (
    <div id="carouselExample" className="carousel slide StoryCarosuel">
      <div class="carousel-inner">
    <div class="carousel-item active">
      <div className='d-flex gap-2'>
      <StoryVideoCard videoSrc="story1.mp4" />
        <StoryVideoCard videoSrc="story1.mp4"/>
        <StoryVideoCard videoSrc="story1.mp4"/>
       
      </div>
    </div>
    <div class="carousel-item">
    <div className='d-flex gap-2'>
    <StoryVideoCard videoSrc="story1.mp4" />
        <StoryVideoCard videoSrc="story1.mp4"/>
        <StoryVideoCard videoSrc="story1.mp4"/>
        
      </div>
    </div>
    <div class="carousel-item">
    <div className='d-flex gap-2'>
        <StoryVideoCard videoSrc="story1.mp4" />
        <StoryVideoCard videoSrc="story1.mp4"/>
        <StoryVideoCard videoSrc="story1.mp4"/>
       
      </div>
    </div>
  </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <FaChevronCircleLeft className="leftbutton" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <FaChevronCircleRight className="rightbutton" />
      </button>
    </div>
  );
}
