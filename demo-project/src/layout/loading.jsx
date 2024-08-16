import React, { useEffect } from 'react';
import './loading.css'; // Ensure you create this CSS file

const Loading = () => {
  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar');
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width += 10;
        progressBar.style.width = width + '%';
        progressBar.setAttribute('aria-valuenow', width);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loading-container vh-100 d-flex justify-content-center align-items-center'>
      <div className='content-container d-flex justify-content-center align-items-center flex-column gap-2'>
        <div>
            <video width="100%" height="100%" autoPlay className="border-0 rounded-2 mt-3">
            <source src="loading.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
        <div className="progress" role="progressbar" aria-label="Loading Progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar" style={{ width: '20%' }}></div>
        </div>
        <div className='mt-4'>
          <h1><strong>Spreads</strong></h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
