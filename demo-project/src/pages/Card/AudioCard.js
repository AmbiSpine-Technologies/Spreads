import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AudioCard.css';

const AudioCard = ({ imageSrc, audioSrc, title }) => {
  const audioRef = useRef(null);

  const handleImageClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="audio-card d-flex flex-column m-2">
      <img src={imageSrc} alt={title} onClick={handleImageClick} className="audio-image" />
      <audio ref={audioRef} src={audioSrc} />
      <h5 className="mt-2 text-center text-capitalize fs-6 fw-normal">{title}</h5>
    </div>
  );
};

export default AudioCard;
