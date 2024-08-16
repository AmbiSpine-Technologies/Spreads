import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Picker from '@emoji-mart/react';
import { clearErrors, createPost } from '../../../actions/postAction';
import { BsEmojiSmileFill, BsFillPersonFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { PiFileAudioLight, PiFileVideoLight } from "react-icons/pi";
import "./createPost.css";
import { NEW_POST_RESET } from '../../../constant/postConstant';
import { useNavigate } from "react-router-dom";
import PollComponent from '../PollForm';

const CreatePost = () => {
  const [emoji, setEmoji] = useState(false);
  const [Poll, setPoll] = useState(false);
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [videos, setVideo] = useState([]);
  const [videosPreview, setVideoPreview] = useState([]);
  const [audio, setAudio] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newPost);

 
// Handle audio changes
const handleAudioChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 20000000) { // 20MB limit for example
    toast.error('Audio file size should be less than 20MB');
    return;
  }
  setAudio(file);
};

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Post Created Successfully");
      setInput('');
      setImages([]);
      setVideo([]);
      setAudio(null);
      navigate("/");
      dispatch({ type: NEW_POST_RESET });
    }
   
  }, [dispatch, error, navigate, success, images, audio]);

  const createPostSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('content', input);
    images.forEach((image) => {
      formData.append("images", image);
    });
    videos.forEach(file => formData.append("videos", file));
    if (audio) formData.append("audio", audio);
    
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
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
  
    setVideo([]);
    setVideoPreview([]);
  
    files.forEach((file) => {
      if (file.size > 50000000) { // 50MB limit
        toast.error('Video file size should be less than 50MB');
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setVideoPreview((old) => [...old, reader.result]);
          setVideo((old) => [...old, file]);
        }
      };
  
      reader.readAsDataURL(file);
    });
  };


  

  return (
    <div className="modal-dialog modal-dialog-centered"style={{ width: "700px" }} >
      <div className="modal-content position-relative">
        <div className="modal-header border-0">
          <h1 className="modal-title fs-5 text-center w-100">Create</h1>
          <button type="button" className="btn-close btn-close-custom" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form 
           onSubmit={createPostSubmitHandler}
           encType="multipart/form-data"
          >
            <div className="mb-3 d-flex">
              <div className="logos mt-1">
                <img src="https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg" style={{ width: "60px", height: "60px" }} alt="Profile"/>
              </div>
              <div className='ms-4'>
                <textarea 
                  className="form-control rounded-0" 
                  cols="40" 
                  rows="10" 
                  id="message-text"
                  placeholder="Share with us. Try with AI"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <div className="icon-container mt-2">
                  <label className="d-flex mt-1" htmlFor="file">
                    <CiImageOn className="border border-0 fs-3"/>
                    <input 
                      type="file" 
                      id="file" 
                      className="d-none"
                      name='images'
                      accept="image/*" multiple 
                      onChange={createPostImagesChange}
                    />
                  </label>
                  <label className="d-flex mt-1" htmlFor="video">
                    <PiFileVideoLight className="border border-0 fs-3"/>
                    <input 
                      type="file" 
                      id="video" 
                      className="d-none"
                      name='videos'
                      accept="video/*" multiple 
                      onChange={handleVideoChange}
                    />
                  </label>
                  <label className="d-flex mt-1" htmlFor="audio">
                    <PiFileAudioLight className="border border-0 fs-3"/>
                    <input 
                      type="file" 
                      id="audio" 
                      className="d-none"
                      name='audio'
                      accept="audio/*" 
                      onChange={handleAudioChange}
                    />
                  </label>
                  <div className="poll" onClick={() => setPoll(!Poll)}>Poll</div>
                  <BsEmojiSmileFill style={{ color: "goldenrod" }} onClick={() => setEmoji(!emoji)}/>
                  {emoji && 
                    <div className='emoji-container position-absolute'>
                      <Picker onEmojiSelect={addEmoji} />
                    </div>
                  }
                  <BsFillPersonFill/>
                </div>
                <div className='d-flex gap-1'>
                  <div id='createPostFormImage'>
                  {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Post Preview"
                  style={{ width: "20%", marginTop: "10px" }}
                  />
                ))}
                  </div>
                {videos.length > 0 && videos.map((file, index) => (
                  <video 
                    key={index}
                    controls
                    src={URL.createObjectURL(file)}
                    style={{ width: "20%", marginTop: "10px" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ))}
                {audio && (
                  <audio 
                    controls
                    src={URL.createObjectURL(audio)}
                    style={{ width: "20%", marginTop: "10px" }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
                </div>
              </div>
            </div>
           { Poll &&  <div className='d-flex justify-content-center align-item-center'>
            <PollComponent/>
            </div>}
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary rounded-0 w-25" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
          {error && <p className="text-danger text-center">{error}</p>} 
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
