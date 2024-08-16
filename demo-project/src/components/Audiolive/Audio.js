// import './Audio.css';
// import { PiDotsThreeOutlineFill } from "react-icons/pi";
// import { TiMicrophone } from "react-icons/ti";
// import { HiUserCircle } from "react-icons/hi2";
// import { RxCross2 } from "react-icons/rx";
// import { LuSend } from "react-icons/lu";

// export default function Audio() {
//   return (
//     <div className="audio-container">
//       <div className="row">
//         <div className="col bg-dark text-white rounded-2">
//           <div className="text-end"><PiDotsThreeOutlineFill /></div>
//           <div className='text-center align-content-center img-container'>
//             <img src="deposit.jpg" className="img-fluid rounded-circle" />
//              <h5>Host</h5>
//           </div>
//           <div className='d-flex justify-content-between pb-2'>
//             <TiMicrophone className='fs-4 bg-white rounded-circle text-black p-1' />
//             <HiUserCircle className='fs-4 bg-white rounded-circle text-black p-1' />
//           </div>
//         </div>
//         <div className="col bg-body me-2 left-corner d-flex flex-column justify-content-between">
//           <div className="text-end">
//             <RxCross2 className='fs-2 fw-bold p-1' />
//           </div>
//           <div className='mt-auto'>
//             <form className='d-flex'>
//               <input type='text' className='form-control' />
//               <LuSend className='bg-primary text-white rounded-circle fs-3 p-1 mt-1 share-icon' />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import './Audio.css';
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { TiMicrophone } from "react-icons/ti";
import { HiUserCircle } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { LuSend } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { TbFlag3Filled } from "react-icons/tb";
import React, { useState } from 'react';

export default function Audio() {
  const [threedot, setThreeDot] = useState(false);

  function threedothandle() {
    setThreeDot(!threedot);
  }
  return (
    <div className="audio-container">
      <div className="row host-container">
        <div className="col bg-dark text-white rounded-2  d-flex flex-column justify-content-between ">
          <div className="text-end" onClick={threedothandle}><PiDotsThreeOutlineFill /></div>
          { threedot && <div className='position-absolute show-option-1 mt-2'> <ThreeDot /> </div> }

          <div className='d-flex justify-content-between pb-2'>
            <TiMicrophone className='fs-4 bg-white rounded-circle text-black p-1' />
            <HiUserCircle className='fs-4 bg-white rounded-circle text-black p-1' />
          </div>
        </div>

        <div className="col bg-body me-2  d-flex flex-column justify-content-between">
  <div className="text-end">
    <RxCross2 className='fs-2 fw-bold p-1' />
  </div>
  <div className='mt-auto'>
    <form className='d-flex align-items-center'>
      <img src="deposit.jpg" className="img-fluid rounded-circle me-2" width="40" height="40" />
      <input type='text' className='form-control' />
      <LuSend className='bg-primary text-white rounded-circle fs-3 me-1 p-1 mt-1 share-icon' />
      <div className='ms-2 mt-3 align-self-end'>
        <img src='logo_1.JPG' className="img-fluid" width="40" height="40" />
      </div>
    </form>
  </div>
</div>

      </div>
    </div>
  );
}


function ThreeDot(){
    return (
        <div className='ThreeDot mt-3 pb-2'>
            <div className='bg-secondary py-1 rounded-1 '>
            <a href='#' className='text-white'><IoMdSettings className='me-3 ms-2 ' />Space settings</a>
            </div>
            <a href='#' className='text-white px-2'><FaRegClosedCaptioning className='me-3' />Show captions</a> <br />
            <a href='#' className='text-danger px-2'><TbFlag3Filled className='me-3' />Report this Space</a>
        </div>
    )
}