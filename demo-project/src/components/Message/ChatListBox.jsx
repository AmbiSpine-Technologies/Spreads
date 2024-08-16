import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMessage } from "react-icons/ai";
import "./chatlist.css"; 
import { IoIosSearch } from "react-icons/io";
import ConversationList from './conversation/ConversationList.js';
import RequestModal from './Dailog/RequestModal.jsx';
import NetworkModal from './Dailog/NetworkModal.jsx';
import MessageModal from './Dailog/MessageModal/MessageModal.jsx';
import GroupModalComponent from './Dailog/MessageModal/GroupModal.jsx';
import { fetchChats } from '../../actions/chatAction.js';
import ProfileBioMadal from './Dailog/ProfileBioModal.jsx';
import ProfileModal from './Dailog/ProfileModal.jsx';
import { NavLink } from 'react-router-dom';
import { useSocket} from '../../utlis/socket.jsx';

function ChatListBox() {

  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector(state => state.chat);

  const socket=useSocket();

  console.log(socket.id)

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="chat-containers-me ">
      <div className="chat-box">
       <div className='justify-content-between align-items-center d-flex p-2'>
       <div>
       <NavLink to="/" className=' btn btn-light p-1 me-4 rounded-circle'>
        <i class="bi bi-arrow-left"></i>
      </NavLink>
       <span className='text-left fw-semibold'>Messages</span>
       </div>
       <button className='btn'>
       <i class="bi bi-gear-fill"></i>
       </button>
       </div>
        <div className="messages">
            <form 
            className='bg-body-secondary border-dark rounded justify-content-between align-items-center d-flex
            rounded-1 p-2'>
                <input type="text"
                style={{ outline: "none" }}
                className='w-100 border-0 bg-transparent'
                placeholder='Search' />
                <IoIosSearch className='fs-4 me-2' style={{color:"blue"}}/>
            </form>
            <div className='justify-content-around align-items-center d-flex mt-3'>
            <button className='btn btn-sm fw-semibold w-25 me-1'
             data-bs-toggle="modal" data-bs-target="#messageModal"
            >Profile</button>
            <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <ProfileModal/>
            </div>
            <button className='btn fw-semibold btn-sm w-25 me-1'
            data-bs-toggle="modal" data-bs-target="#natworkModal"
            >Network</button>
            <button className='btn fw-semibold  btn-sm w-25 me-1'
             data-bs-toggle="modal" data-bs-target="#groupModal"
            >Group</button>
            <div class="modal fade" id="groupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <GroupModalComponent chats={chats}/>
            </div>
            <button className='btn fw-semibold  btn-sm w-25 me-1'data-bs-toggle="modal" data-bs-target="#requestModal">Request</button>
            <div class="modal fade" id="requestModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <RequestModal/>
            </div>
            <div class="modal fade" id="natworkModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <NetworkModal chats={chats}/>
            </div>
          </div>

          <div className='p-2'>
            <ConversationList chats={chats}/>
          </div>
        </div>
         {/* <div className='d-flex justify-content-end me-4 '>
        <button className='btn btn-light p-1 me-4 rounded-circle position-relative'>
        <AiOutlineMessage 
         className='fs-3'/>
         <i class="bi bi-plus fs-5 position-absolute bottom-0  start-100" style={{marginLeft:"-12px"}}></i>
        </button>

         </div> */}
        
      </div>
      
       
    
    </div>
  );
}

export default ChatListBox;

