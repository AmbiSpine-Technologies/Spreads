import { RxCross2 } from "react-icons/rx";
import { MdOutlineUpload } from "react-icons/md";
import { PiGifLight } from "react-icons/pi";
import { PiCalculator } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { BiAddToQueue } from "react-icons/bi";
import { IoCaretDownOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineVideoCall } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { CiRepeat } from "react-icons/ci";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import React, { useState, useRef } from 'react';
import './EventCard.css';
import { useSelector } from "react-redux";
const EventCard = () => {
  const {user} = useSelector((state) => state.user);
  const [date, setDate] = useState("16 jun 2024");
  const [time, setTime] = useState("12:00");

  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const openDatePicker = () => {
    dateInputRef.current.showPicker();
  };
  const openTimePicker = () => {
    timeInputRef.current.showPicker();
  };
  return (
    <div className="container-fluid Create-event">
    <div  className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{width:"700px"}}>
       <div className="modal-content ">
              <div className="d-flex modal-header justify-content-between align-items-center ">
                <h1 className="modal-title fs-6 fw-semibold text-center w-100" id="exampleModalLabel">Create Event</h1>
                <button type="button" className="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-block">
                <div className="dropdown-box position-relative">
                  <div className="dropdown dropdownfirst">
                    <button className="btn btn-secondary me-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                      <BiAddToQueue /> Add
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a href="" className="text-secondary ms-3 text-decoration-none">
                          <MdOutlineUpload className="fs-5 ms-1" /> Upload
                        </a>
                      </li>
                      <li>
                        <a href="" className="text-secondary ms-3 text-decoration-none">
                          <PiGifLight className="fs-5 ms-1 fw-bolder" /> Pick a GIF
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-start mt-2 mx-2 Add-by-event">
                  <img src={user?.avatar[0]?.url} width="50" height="50" alt=""
                    className="border-0 rounded-5 ms-2 mt-2" />
                  <div>
                    <h3 className="ms-3 mt-3 fs-5 ">{user?.firstName} {user?.lastName}</h3> <br />
                    <p className="ms-3" style={{ marginTop: "-30px" }}>
                      Host-Your profile
                    </p>
                  </div>
                </div>
                <div className="m-2 eventcontainer border-1 rounded-4">
                  <input type="text" className="w-100  no-outline" style={{ height: "50px" }} id="eventname" placeholder=" Event Name" />
                </div>

                <div className="d-flex justify-content-start">
                  <div className="time-zone d-flex justify-content-evenly position-relative mx-2" onClick={openDatePicker}>
                    <div>
                      <PiCalculator className="fs-3 ms-1 mt-3" />
                    </div>
                    <div className="mt-1">
                      <span>Start date</span> <br />
                      <span>{date}</span>
                    </div>
                  </div>
                  <input type="date" value={date} onChange={handleDateChange} ref={dateInputRef} className="hidden-date-input" />

                  <div className="time-zone d-flex justify-content-evenly position-relative mx-2" onClick={openTimePicker}>
                    <div>
                      <IoMdTime className="fs-3 mt-3 ms-1" />
                    </div>
                    <div className="mt-1">
                      <span>Start time</span>
                      <br />
                      <span className="ms-1">{time}</span>
                    </div>
                  </div>
                  <input type="time" value={time} onChange={handleTimeChange} ref={timeInputRef} className="hidden-time-input" />

                  <div className="time-zone mx-2">
                    <span className="fs-6 mt-3 ms-3">Time Zone</span> <br />
                    <span className="ms-3">GMT +5:30</span>
                  </div>
                </div>
                <p className="my-2"> <a className="text-primary text-decoration-none fw-bold ms-2">+ End date and time</a></p>

                <div className="dropdown-center mx-2 mt-2">
                  <button className="w-100 but-drop" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-between mx-2">
                      Is it in person or virtual? <IoCaretDownOutline />
                    </div>
                  </button>
                  <ul className="dropdown-menu w-100 dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item fs-6" href="#"><RiSendPlaneLine className="fs-5 me-2" />In Person</a></li>
                    <li><a className="dropdown-item fs-6" href="#"><MdOutlineVideoCall className="fs-5 me-2" /> Virtual</a></li>
                  </ul>
                </div>

                <div className="dropdown-center mx-2 mt-2">
                  <button className="w-100 but-drop" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex justify-content-between mx-2">
                      <span><CiLock className="me-2" /> Who can see it? </span> <IoCaretDownOutline />
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-start w-100" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item fs-6" href="#"><RiSendPlaneLine className="fs-5 me-2" />In Person</a></li>
                    <li><a className="dropdown-item fs-6" href="#"><MdOutlineVideoCall className="fs-5 me-2" /> Virtual</a></li>
                  </ul>
                </div>
                <div className="mt-2 mx-2">
                  <textarea id="details" name="details" className="fixed-textarea w-100" placeholder="What are the details?"></textarea>
                </div>

                <div className="accordion" id="AddAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Add-co-host" aria-expanded="false" aria-controls="Add-co-host">
                        <GoPlusCircle className="me-2 fs-5" /> Add co-hosts
                      </button>
                    </h2>
                    <div id="Add-co-host" className="accordion-collapse collapse" data-bs-parent="#AddAccordion">
                      <div className="accordion-body">
                        Add co-host
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        <CiRepeat className="me-2 fs-5" /> Repeat event
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#AddAccordion">
                      <div className="accordion-body">
                        Repeat event
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        <MdOutlineFormatListBulleted className="me-2 fs-5" /> Additional settings
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" data-bs-parent="#AddAccordion">
                      <div className="accordion-body">
                        Settings
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn w-100  btn-light" data-bs-dismiss="modal">Create Event</button>
              </div>
       </div>
    </div>
  </div>
  )
}

export default EventCard