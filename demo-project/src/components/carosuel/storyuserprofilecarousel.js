import React, { useState } from "react";
import "./storyuserprofilecarousel.css"

export function StoryUserCard() {
  return (
    <div className="">
      <img src='deposit.jpg' width="70" height="70" className="img-fluid rounded-circle border border-4 border-danger" alt="user story" />
    </div>
  );
}

const StoryUserCarousel = () => {
  const UserArray = [
    <StoryUserCard key={1}  />,
    <StoryUserCard key={2} />,
    <StoryUserCard key={3} />,
    <StoryUserCard key={4} />,
    <StoryUserCard key={5} />,
    <StoryUserCard key={6} />,
    <StoryUserCard key={7} />,
    <StoryUserCard key={8} />,
    <StoryUserCard key={9} />,
    <StoryUserCard key={10} />,
    <StoryUserCard key={11} />,
  ];


  const chunks = UserArray.reduce((acc, _, i, arr) => (i % 8 === 0 ? [...acc, arr.slice(i, i + 8)] : acc), []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);
  const handleNext = () => currentSlide < chunks.length - 1 && setCurrentSlide(currentSlide + 1);


  return (
    <div className="d-flex justify-content-center align-items-center bg-white rounded-3 storyuserprofilecarousel">
      <div id="carouselCard" className="carousel slide">
        <div className="carousel-inner">
          {chunks.length ? (
            chunks.map((chunk, index) => (
              <div className={`carousel-item ${index === currentSlide ? "active" : ""}`} key={index}>
                <div className="d-flex">
                  {chunk.map((post, idx) => (
                    <div key={idx} className="p-2">
                      {post}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="d-flex">
                <div className="p-5 text-center">No posts available in this category.</div>
              </div>
            </div>
          )}
        </div>
        {chunks.length > 1 && currentSlide > 0 && (
          <button className="carousel-control-prev" type="button" onClick={handlePrev}>
            <span className="carousel-control-prev-icon"></span>
          </button>
        )}
        {chunks.length > 1 && currentSlide < chunks.length - 1 && (
          <button className="carousel-control-next" type="button" onClick={handleNext}>
            <span className="carousel-control-next-icon"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryUserCarousel;

