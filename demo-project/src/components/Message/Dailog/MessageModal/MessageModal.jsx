import React from 'react'
import { IoIosArrowRoundUp } from "react-icons/io";
import "./messageModal.css"

const MessageModal = () => {
  return (
    <div className="modal-dialog modal-dialog-centered" style={{width:"600px"}}>
      <div className="modal-content">
        <div className="modal-body p-2">
        <div>
          <form className='w-100 mb-3'>
              <div className="input-group">
                <textarea className='form-control border border-2 rounded-2' rows='5' placeholder='write your message here'></textarea>
              </div>
            </form>
          </div>
            
            <div className="file-upload-container mx-3 ">
                <label className="file-upload-label">
                  <IoIosArrowRoundUp className="file-upload-icon" />
                  Upload media and drag
                  <input type="file" className="file-upload-input" />
                </label>
          </div>
        </div>
        <div className="modal-footer border-0 border-top-0">
            <button type="button" className="btn btn-primary border-0 btn-sm" data-bs-dismiss="modal">Send</button>
          </div>
      </div>
    </div>
  )
}

export default MessageModal