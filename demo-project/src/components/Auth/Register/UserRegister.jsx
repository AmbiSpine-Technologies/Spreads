import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { BsPersonFillCheck, BsBuildings, BsSuitcaseLgFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { TbBulb } from "react-icons/tb";
import { clearErrors, register } from '../../../actions/userActions';
import Banner from './Banner';
import { toast } from 'react-toastify';
import "../Login/login.css";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, loading } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    mobile: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.firstName) newErrors.firstName = 'First name is required';
    if (!userData.lastName) newErrors.lastName = 'Last name is required';
    if (!userData.username) newErrors.username = 'Username is required';
    if (!userData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!userData.email) newErrors.email = 'Email is required';
    if (!userData.password) newErrors.password = 'Password is required';
    if (!userData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form data before dispatch:', userData);
      dispatch(register({ ...userData, avatar }));
      setUserData({
        firstName: '',
        lastName: '',
        username: '',
        mobile: '',
        email: '',
        password: '',
        termsAccepted: false,
      });
      setAvatarPreview("/Profile.png");
      setErrors({});
    }
  };

  useEffect(() => {
    if (user) {
      toast.success('Registration successful!');
      navigate('/login');
    }
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, general: error }));
      dispatch(clearErrors());
    }
  }, [user, error, dispatch, navigate]);

  return (
    <section className='mt-0'>
      <div className='d-flex justify-content-center align-items-center flex-column' id='banner-container'>
        <Banner />
        <div className='form-container'>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h5 className="text-center mt-3" style={{ fontFamily: "'Petit Formal Script', cursive" }}>
              <strong>See trends and start your journey</strong>
            </h5>
            <div className='mt-3'>
              <input
                type="text"
                name="firstName"
                placeholder='Enter your first name'
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                value={userData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className='mt-3'>
              <input
                type="text"
                name="lastName"
                placeholder='Enter your last name'
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                value={userData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className='mt-3'>
              <input
                type="text"
                name="username"
                placeholder='Enter your username'
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className='mt-3'>
              <input
                type="text"
                name="mobile"
                placeholder='Enter your mobile no.'
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                value={userData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
            </div>
            <div className='mt-3'>
              <input
                type="email"
                name="email"
                placeholder='Enter your email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className='mt-3'>
              <input
                type="password"
                name="password"
                placeholder='Enter your password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div id="registerImage" className="mt-3">
              <img src={avatarPreview} alt="Avatar Preview" className="rounded-circle" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                className="form-control mt-2"
              />
            </div>
            <div className="form-check mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                id="Checkbox"
                className={`form-check-input ${errors.termsAccepted ? 'is-invalid' : ''}`}
                checked={userData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="Checkbox" className="form-check-label text-muted text-small">
                People are sharing photos, videos, audio, and stories using Spreads. Read and{' '}
                <NavLink to='#'>Apply T&C Privacy and Policy</NavLink>.
              </label>
              {errors.termsAccepted && <div className="invalid-feedback">{errors.termsAccepted}</div>}
            </div>
            <div className='mt-3 d-flex justify-content-center align-items-center'>
              <button type="submit" className="SignUp btn btn-primary btn-sm w-50">
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>
            {errors.general && <div className="alert alert-danger mt-2">{errors.general}</div>}
            <div className='d-flex justify-content-center align-items-center mt-4'>
              <div className='line-bar'></div>
              <span className='me-1 ms-1 text-muted'>OR</span>
              <div className='line-bar'></div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <a href="www.google.com">
                <img src="gi.png" alt="" width="20" height="20" />
              </a>
            </div>
          </form>
          <div className='d-flex justify-content-center align-items-center'>
            <NavLink to="/login">Already have an account? Sign In</NavLink>
          </div>
        </div>
      </div>
      <div className='content-container d-flex justify-content-center align-items-center flex-column p-4 mt-4 bg-white'>
        <div className='w-75'>
          <div className='d-flex justify-content-around gap-3 align-items-center'>
            <Feature icon={<BsPersonFillCheck />} text="Spreads has exciting features to connect with each other and share videos, music, audios, and more." />
            <Feature icon={<FiTrendingUp />} text="Explore trending charts, videos, audios, and reels." />
            <Feature icon={<TbBulb />} text="Explore thousands of learning programs, increase your knowledge, your potential with certification, and improve your skills." />
          </div>
          <div className='d-flex justify-content-around gap-3 p-4 align-items-center'>
            <Feature icon={<BsSuitcaseLgFill />} text="Set your job alert on Spreads and grab your job opportunities." />
            <Feature icon={<BsBuildings />} text="Create a marketplace, stay updated with your product, and promote your brand." />
            <Feature icon={<div className='text-primary fs-3 fw-bold m-1'><h3>BS</h3></div>} text="Use Spreads Business Solutions to solve your business problems, hire with us, and find your best solutions." />
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => (
  <div className='w-25'>
    <div className='text-center text-primary fs-3 m-1'>{icon}</div>
    <div><p>{text}</p></div>
  </div>
);

export default UserRegister;
