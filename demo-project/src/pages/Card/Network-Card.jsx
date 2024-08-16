import React from 'react'
import { IoMdInformationCircle } from "react-icons/io";
import "./network.css";



const CardNetwork=()=>{
  return(
    <div className='network d-flex justify-content-between align-items-center mb-3'>
      <div className='d-flex justify-content-between align-items-center'>
      <div className='d-flex justify-content-between align-items-center img-container'>
      <img src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg" className='img' height="100" width="100" alt=""/>
      <img src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"  className='img img-1' height="100" width="100" alt=""/>
      <i class="bi bi-dot dots"></i>
      </div>
      <h5 style={{color:'gray',fontSize:"12px",fontWeight:"bold"}}>Dharmendra Kumar</h5>
      </div>
      <p style={{color:'gray',fontSize:"14px"}}>+10</p>
    </div>
  )
}


const NetworkCard = () => {
  return (
    <div className='card'>
    <div className='card-body'>
   <div className='d-flex justify-content-between align-items-center p-2'>
       <h5 style={{color:'gray',fontSize:"15px"}}>Network</h5>
       <IoMdInformationCircle className='text-primary fs-5 ms-3'/>
   </div>
      <div>
        <CardNetwork/>
        <CardNetwork/>
        <CardNetwork/>
      </div>
   </div>
  
</div>
  )
}

export default NetworkCard