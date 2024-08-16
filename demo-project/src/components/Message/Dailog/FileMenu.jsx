import React, { useRef } from 'react';
import { BiSolidImageAlt } from 'react-icons/bi';
import { MdAudioFile } from 'react-icons/md';
import { FaFileVideo, FaFileDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { sendAttachment } from '../../../actions/chatAction';

export const FileMenu = ({ chatId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.attachment);

  const imageRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();
  const fileRef = useRef();

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const handleFileChange = (e, fileType) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5) {
        return toast.error(`You can only send 5 ${fileType} at a time`);
    }

    const formData = new FormData();
    formData.append('chatId', chatId);

    files.forEach((file) => {
        formData.append('files', file); 
    });

    dispatch(sendAttachment(formData));
};


  return (
    <div className='p-1'>
      <div className='d-flex justify-content-center flex-column gap-2'>
        <div className='file-upload'>
          <input 
            type='file' 
            id='image-upload' 
            className='d-none' 
            accept='image/png,image/jpeg,image/gif' 
            onChange={(e) => handleFileChange(e, 'Images')} 
            ref={imageRef}
          />
          <label 
            htmlFor='image-upload' 
            className='file-label'
            onClick={selectImage}
          >
            <BiSolidImageAlt size={20} className='me-2' /> Image
          </label>
        </div>
        <div className='file-upload'>
          <input 
            type='file' 
            id='audio-upload' 
            className='d-none' 
            accept='audio/mpeg,audio/wave' 
            onChange={(e) => handleFileChange(e, 'Audios')} 
            ref={audioRef}
          />
          <label 
            htmlFor='audio-upload' 
            className='file-label'
            onClick={selectAudio}
          >
            <MdAudioFile size={20} className='me-2' /> Audio
          </label>
        </div>
        <div className='file-upload'>
          <input 
            type='file' 
            id='video-upload' 
            className='d-none' 
            accept='video/*' 
            onChange={(e) => handleFileChange(e, 'Videos')} 
            ref={videoRef}
          />
          <label 
            htmlFor='video-upload' 
            className='file-label'
            onClick={selectVideo}
          >
            <FaFileVideo size={20} className='me-2' /> Video
          </label>
        </div>
        <div className='file-upload'>
          <input 
            type='file' 
            id='file-upload' 
            className='d-none' 
            accept='.pdf,.doc,.docx,.xls,.xlsx,.txt' 
            onChange={(e) => handleFileChange(e, 'Files')} 
            ref={fileRef}
          />
          <label 
            htmlFor='file-upload' 
            className='file-label'
            onClick={selectFile}
          >
            <FaFileDownload size={20} className='me-2' /> File
          </label>
        </div>
      </div>
      {loading && <div className='loading-indicator'>Uploading...</div>}
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
