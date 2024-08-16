import React from "react";
import "./sidebar.css";
import { IoClose } from "react-icons/io5";
import { SiApachenetbeanside } from "react-icons/si";
import { TiAdjustBrightness } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { BsPlusCircleDotted } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { MdHistory, MdGroups2, MdOutlineDarkMode } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { logout } from "../../actions/userActions";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = ({ toggleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="sidebar">
            <div className="bg-dark text-white d-flex justify-content-end align-items-end p-1">
                <IoClose className="fs-5" onClick={toggleClose} />
            </div>
            <div className="sidebar-content">
                <div className="row">
                    <div className="col-6">
                        <div className="Create-with-Spread px-2 py-2 card m-1">
                            <h6 className="fw-bold fs-6">Create With Spreads</h6>
                            <div className="mt-2 ms-2">
                                <h6 className="mt-2 mb-2"><FaRegEdit className="fs-5" /><span className="ms-2 ps-1">Create Post</span></h6>
                                <h6 className="mt-2 mb-2"><RiVideoFill className="fs-5" /><span className="ms-2 ps-1">Shorts</span></h6>
                                <h6 className="mt-2 mb-2"><BsPlusCircleDotted className="fs-5" /><span className="ms-2 ps-1">Stories</span></h6>
                                <h6 className="mt-2 mb-2"><MdGroups2 className="fs-5" /><span className="ms-2 ps-1">Community</span></h6>
                                <h6 className="mt-2 mb-2"><PiMicrophoneFill className="fs-5" /><span className="ms-2 ps-1">Go live</span></h6>
                            </div>
                        </div>
                        <div className="Create-with-Spread px-2 py-2  card m-1">
                            <h6 className="fw-bold fs-6">Visiting Places</h6>
                            <div className="mt-2 ms-2">
                                <h6 className="mt-3 mb-3"><FaRegEdit className="fs-5" />
                                <span className="ms-2 ps-1">Admin Center</span></h6>
                                <h6 className="mt-3 mb-3"><RiVideoFill className="fs-5" />
                                <span className="ms-2 ps-1">Ads Center</span></h6>
                                <h6 className="mt-3 mb-3"><BsPlusCircleDotted className="fs-5" /><span className="ms-2 ps-1">Go To Learning</span></h6>
                                <h6 className="mt-3 mb-3"><MdGroups2 className="fs-5" /><span className="ms-2 ps-1">Create Company Page</span></h6>
                            </div>
                        </div>

                        <div className="Create-with-Spread px-2 py-2  card m-1">
                            <h6 className="mt-2 mb-2"><MdOutlineDarkMode className="fs-5" /><span className="ms-2 ps-1">Switch To Dark Mode</span></h6>
                        </div>
                    </div>

                    <div className="col-6">
                    <div className="right-side px-2 py-2  card m-1">
                            <h6 className="fw-bold fs-6">Spreads Solution</h6>
                            <h6>Find your Job</h6>
                            <p>Find your perfect job.</p>
                            <h6>Set your job goal</h6>
                            <p >Set your perfect job alert and dream job resources.</p>
                            <h6>Hire with us</h6>
                            <p >Get talent insight, find, and recruit with us.</p>
                            <h6 className="fw-bold fs-6 mt-4">Monetization</h6>
                            <h6>Go to monetization</h6>
                            <p >Create your creator profile with us and earn with us.</p>
                            <h6 className="fw-bold fs-6 mt-4">Resume Writing</h6>
                            <h6>Resume samples</h6>
                            <p >Try resume samples and get your perfect resume.</p>
                            <h6>Resume quality score</h6>
                            <p>Test your resume quality.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark text-white p-1  d-flex justify-content-end">
                <button type="submit" onClick={handleLogout} className="btn btn-primary btn-sm">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
