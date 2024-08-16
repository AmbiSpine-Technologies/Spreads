import React, { useState } from 'react';
import { MdFiberManualRecord } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

const Spread_News = () => {
  const [showMore, setShowMore] = useState(false);

  const textArray = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.dolor sit amet consectetur adipisicing elit",
    "Atque mollitia animi veniam ratione! Quisquam quo maiores voluptate blanditiis animi excepturi.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Atque mollitia animi veniam ratione! Quisquam quo maiores voluptate blanditiis animi excepturi.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Atque mollitia animi veniam ratione! Quisquam quo maiores voluptate blanditiis animi excepturi.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  ];

  const previewCount = 3;

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center p-1'>
          <h5 style={{ color: 'gray', fontSize: "15px" }}>Spreads News</h5>
          <div>
            <div className='badge rounded-pill text-bg-danger'>
              <MdFiberManualRecord className='fs-6' />
              <span className='ms-2' style={{ fontSize: "13px" }}>LIVE</span>
            </div>
            <IoMdInformationCircle className='text-primary fs-5 ms-3' />
          </div>
        </div>
        <ul style={{ textAlign: "left", fontSize: "13px", fontWeight: '500', color: "secondary" }}>
          
          {showMore ? textArray.map((item, index) => (
            <li key={index} className='mb-2'>{item}</li>
          )) : textArray.slice(0, previewCount).map((item, index) => (
            <li key={index} className='mb-2'>{item}...</li>
          ))}
        </ul>
        <div className='d-flex justify-content-between  align-items-left'>
          <a href="#" className='fw-semibold text-decoration-none' onClick={(e) => { e.preventDefault(); setShowMore(!showMore); }}>
            {showMore ? 'See less' : 'See more'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Spread_News;

