

import React, { useState } from "react";
import Card from "../../pages/Card/Card";
import "./carosuel.css";

const Carousel = ({ posts, category }) => {
  // Filter and chunk posts
  const filteredPosts = category === "all" ? posts : posts.filter(post => post.category === category);
  const chunks = filteredPosts.reduce((acc, _, i, arr) => (i % 3 === 0 ? [...acc, arr.slice(i, i + 3)] : acc), []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);
  const handleNext = () => currentSlide < chunks.length - 1 && setCurrentSlide(currentSlide + 1);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div id="carouselCard" className="carousel slide">
        <div className="carousel-inner">
          {chunks.length ? (
            chunks.map((chunk, index) => (
              <div className={`carousel-item ${index === currentSlide ? "active" : ""}`} key={index}>
                <div className="d-flex">{chunk.map((post, idx) => <Card key={idx} {...post} />)}</div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="d-flex"><div className="p-5 text-center">No posts available in this category.</div></div>
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

export default Carousel;
