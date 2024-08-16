import React from 'react'
import './VideoCard.css'; 

const Videos=()=>{
    return(
       <div className='videos-card'>
         <div className='video-content'>
             {/* <video src="https://youtu.be/HCDVN7DCzYE" className=''
            controls autoplay loop muted /> */}
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HCDVN7DCzYE"
             title="Earth 101 | National Geographic" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
         <img src="person.jpeg" alt="" width="30" height="30" />
         <div>
             <p className='text-black'>@dharmendra@gmail.com</p>
         </div>
       </div>
    )
}

const  VideoCarsoule=()=>{
  return (
   <div className='container-fluid p-4 bg-black'>
    <div className='container'>
    <div id="carouselExampleControls" class="carousel slide bg-white" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div className='d-flex gap-2'>
        <Videos  />
        <Videos />
        <Videos />
       
      </div>
    </div>
    <div class="carousel-item">
    <div className='d-flex gap-2'>
        <Videos  />
        <Videos />
        <Videos />
        
      </div>
    </div>
    <div class="carousel-item">
    <div className='d-flex gap-2'>
        <Videos  />
        <Videos />
        <Videos />
       
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
   </div>
  )
}

export default VideoCarsoule