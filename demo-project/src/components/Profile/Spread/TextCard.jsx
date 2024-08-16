import React, { useEffect, useState } from 'react';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { MdBarChart } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEventRepeat } from "react-icons/md";
import "./text.css";
import TimeSchedule from './TimeSchedule';
import CreatePollModal from './CreatePollModal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Picker from '@emoji-mart/react';
import { clearErrors, createPost } from '../../../actions/postAction.js';
import { NEW_POST_RESET } from '../../../constant/postConstant';
import { useNavigate } from "react-router-dom";

const TextCard = () => {
  const [emoji, setEmoji] = useState(false);
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newPost);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Post Created Successfully");
      setInput('');
      setImages([]);
      setImagesPreview([]);
      navigate("/");
      dispatch({ type: NEW_POST_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createPostSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', input);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createPost(formData));
  };
  
  const addEmoji = (e) => {
    const sym = e.unified.split("-");
    const codeArray = sym.map(el => "0x" + el);
    const emoji = String.fromCodePoint(...codeArray);
    setInput(prevInput => prevInput + emoji);
  };

  const createPostImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <form 
      onSubmit={createPostSubmitHandler}
      encType="multipart/form-data"
      style={{width:'300px',height:'300px'}}
      className='card m-2'
    >
      <div className='text-containers'>
        <textarea 
          cols="33" 
          rows="3" 
          id="message-text"
          placeholder="What's in your mind?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div className='text-content'>
        <button type="button" onClick={() => setEmoji(!emoji)} className='me-2 text-warning'>
          <MdOutlineEmojiEmotions/>
        </button>
        <button type="button"  className='me-2 text-primary'><strong>B</strong></button>
        <button type="button" className='me-2 text-primary'><strong>Aa</strong></button>
      </div>
      {emoji && 
        <div className='emoji-container position-absolute'>
          <Picker onEmojiSelect={addEmoji} />
        </div>
      }
      <div className='card-body'>
        <div className='d-flex justify-content-center gap-3'>
          <label htmlFor="file">
            <CiImageOn size={25} className='border border-1 p-1 rounded-2 text-primary'/>
            <input 
              type="file" 
              id="file" 
              className="d-none"
              name='images'
              accept="image/*" 
              multiple 
              onChange={createPostImagesChange}
            />
            <p className='text-muted text-center fw-semibold text-small'>Media</p>
          </label>
          <label data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Create Poll">
            <MdBarChart size={25} data-bs-toggle="modal" data-bs-target="#pollModal"
              className='border border-1 p-1 rounded-2 text-primary'/>
            <p className='text-muted text-center fw-semibold text-small'>Create Poll</p>
          </label>
          <label data-bs-toggle="modal" data-bs-target="#scheduleModal">
            <MdOutlineEventRepeat size={25} className='border border-1 p-1 rounded-2 text-primary'/>
            <p className='text-muted text-center fw-semibold text-small'>Schedule</p>
          </label>
          <label>
            <IoLocationSharp size={25} className='border border-1 p-1 rounded-2 text-primary'/>
            <p className='text-muted text-center fw-semibold text-small'>Tag Location</p>
          </label>
        </div>
        <div className='d-flex align-items-center justify-content-center w-100'>
          <button type="submit" className='btn btn-primary btn-sm fw-bold'>Spread Now</button>
        </div>
      </div>
      <div className='mb-4 mt-0 ms-2'>
        {imagesPreview.map((image, index) => (
          <img key={index} src={image} alt="Post Preview"
            style={{ width: "30%" }}
          />
        ))}
      </div>
      <div className="modal fade" id="scheduleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <TimeSchedule/>
        </div>
      </div>
      <div className="modal fade" id="pollModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <CreatePollModal/>
        </div>
      </div>
    </form>
  );
};

export default TextCard;
