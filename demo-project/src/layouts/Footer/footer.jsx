import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import "./footer.css";

const Footer = () => {
  return (
    <div className='container-fluid bg-dark position-relative footer'>
         <div>
         <div className='contact-us p-3 bg-primary justify-content-center align-items-center'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <h3 className='text-white fs-small fw-bold'>Ready for the next project?</h3>
                        <p className='text-muted'>Let's get started</p>
                    </div>
                    <div>
                        <button className='btn btn-dark rounded-0' data-bs-toggle="modal" data-bs-target="#contactModal">Contact Us</button>
                    </div>
                </div>
            </div>
         </div>
        <div className='container justify-content-center align-items-center'>
            <div className='row text-white mt-4 position-relative'>
                <div className='col-12 col-md-3'>
                    <h1 className="fs-6"><strong>Your Brand</strong></h1>
                    <p className='text-muted'>&copy; 2024</p>
                </div>
                <div className='col-12 col-md-3'>
                    <h5 className='fs-small fw-semibold'>Company</h5>
                    <ul className='list-unstyled'>
                        <li><NavLink to="/" className='text-secondary  text-decoration-none'>About</NavLink></li>
                        <li><NavLink to="/" className='text-secondary  text-decoration-none'>Career</NavLink></li>
                        <li><NavLink to="/" className='text-secondary text-decoration-none'>Contact Us</NavLink></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3'>
                    <h5 className='fs-small fw-semibold'>Further Information</h5>
                    <ul className='list-unstyled'>
                        <li><NavLink to="/" className='text-secondary   text-decoration-none'>Terms & Conditions</NavLink></li>
                        <li><NavLink to="/" className='text-secondary  text-decoration-none'>Privacy Policy</NavLink></li>
                        <li><NavLink to="/" className='text-secondary  text-decoration-none'>Contact Us</NavLink></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3'>
                    <h5 className='fs-small fw-semibold'>Follow Us</h5>
                    <div className='d-flex gap-2'>
                        <NavLink to="/" className='text-white'>
                            <FaFacebookF className='fs-4' />
                        </NavLink>
                        <NavLink to="/" className='text-white'>
                            <FaInstagram className='fs-4' />
                        </NavLink>
                        <NavLink to="/" className='text-white'>
                            <FaTwitter className='fs-4' />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="contactModalLabel">New message</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                <input type="text" className="form-control" id="recipient-name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Footer;
