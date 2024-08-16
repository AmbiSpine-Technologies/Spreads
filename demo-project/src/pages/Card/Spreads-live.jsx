import React from 'react'
import "./network.css"
const Spreadslive = () => {
  return (
    <div className='card' style={{height:'200px'}}>
        <div className="text-center p-2">
            <h5 style={{color:'blue',fontSize:"15px"}}><strong>Spreads Live</strong></h5>
        </div>
        <hr />
        <div className='d-flex justify-content-center align-items-center flex-column text-center' sty>
            <div className='d-flex align-items-center'>
            <i class="bi bi-mic fs-5 me-2"></i>
            <p className="fs-5">Audio room</p>
            </div>
            <div className='d-flex align-items-center text-center'>
            <i class="bi bi-camera-video fs-5 me-2"></i>
                <p className="fs-5">Video room</p>
            </div>
        </div>
     </div>
  )
}

export default Spreadslive