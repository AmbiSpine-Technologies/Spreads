import React, { Fragment, useEffect, useState, useCallback, useRef } from 'react';
import { HiCheckBadge } from 'react-icons/hi2';
import './MessageList.css'; 
import Title from '../Tittle/Title';
import AppLayout from '../../../../layout/MessageLayout'; 
import MessageItem from './MessageItem'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchChatDetails, fetchMessages, newMessageAlert, removeAlertMessage } from '../../../../actions/chatAction';
import useSocketEvents from '../../../../hooks/hook';
import { useSocket } from '../../../../utlis/socket';
import { FaMicrophone } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { NEW_MESSAGE } from '../../../../constant/event';
import Picker from '@emoji-mart/react';
import { MdOutlineAttachment } from "react-icons/md";
import { FileMenu } from '../../Dailog/FileMenu';

const MessageBox = () => {
  const dispatch = useDispatch();
  const { id: chatId } = useParams();
  const [messagesArr, setMessageArr] = useState([]);
  const [message, setMessages] = useState('');
  const [page, setPage] = useState(1);
  const [emoji, setEmoji] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const containerRef = useRef(null);
  const emojiRef = useRef(null);
  const socket = useSocket();

  const { chat, loading, error } = useSelector(state => state.chatDetails);
  const { user } = useSelector(state => state.user);
  const { messages: oldMessageChunk } = useSelector(state => state.message);
  const messageAlerts = useSelector(state => state.messageAlerts);
  const members = chat?.chat?.members;

  const allMessage = [...oldMessageChunk, ...messagesArr];

  useEffect(() => {
    dispatch(fetchChatDetails({ id: chatId }));
    dispatch(fetchMessages(chatId, page));
  }, [dispatch, chatId, page]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messagesArr]);

  useEffect(() => {
    setMessageArr([]);
    setMessages('');
    dispatch(removeAlertMessage(chatId));
  }, [chatId, dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessages('');
  };

  const addEmoji = useCallback((emoji) => {
    setMessages(prevInput => prevInput + emoji.native);
  }, []);

  const handleNewMessage = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessageArr(prev => [...prev, data.message]);
  }, [chatId]);

  const newMessageAlretHandler = useCallback((data) => {
    const { chatId: alertChatId, message } = data;
    if (alertChatId === chatId) {
      dispatch(newMessageAlert(alertChatId, message));
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    socket.on(NEW_MESSAGE, handleNewMessage);
    socket.on('NEW_MESSAGE_ALERT', newMessageAlretHandler);
    return () => {
      socket.off(NEW_MESSAGE, handleNewMessage);
      socket.off('NEW_MESSAGE_ALERT', newMessageAlretHandler);
    };
  }, [socket, handleNewMessage, newMessageAlretHandler]);

  const sortedMessages = allMessage.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const messageItems = sortedMessages.map((message) => (
    <MessageItem message={message} user={user} key={message._id} />
  ));

  const handleFileOpen = () => {
    setIsFile(prev => !prev);
  };

  const handleEmoji = () => {
    setEmoji(prev => !prev);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading chat details</div>;

  return (
    <>
      <div className='d-flex flex-column w-100' style={{ height: '90%' }}>
        <Title user={user} />
        <main className='flex-grow-1 overflow-auto p-1'>
          <div className='d-flex justify-content-center flex-column align-items-center gap-2 mt-4'>
            <img 
              src={user.avatar[0].url || 'https://randomuser.me/api/portraits/men/1.jpg'}
              width='60' 
              height='60'
              className='rounded rounded-5 border'
              alt='User Profile' 
            />
            <div className='d-flex text-center'>
              <span className='text-black fs-6 fw-semibold me-2 ms-2' style={{ fontFamily: "fantasy" }}>{user.firstName} {user.lastName}</span>
              <HiCheckBadge size={15} className='text-primary mt-1' />
            </div>
            <p className='w-50 text-center fw-semibold' style={{ fontFamily: "revert", fontSize: "0.8rem" }}>
              {user.bio}
            </p>
          </div>
          <div id='chat-message-list' className='w-100' ref={containerRef}>
            {messageItems}
          </div>
        </main>
      </div>
      <div className='new-conversation'>
        <form className='d-flex align-items-center' onSubmit={handleSendMessage}>
          <div className='input-container d-flex align-items-center'>
            <div ref={emojiRef}>
              <MdOutlineAttachment
                onClick={handleFileOpen}
                size={20}
                className='p-0 me-2'
                aria-label='Toggle file menu'
              />
            </div>
            <input
              type='text'
              className='me-2'
              value={message}
              onChange={(e) => setMessages(e.target.value)}
              placeholder='Type a message'
              aria-label='Message input'
            />
            <button 
              type='submit' 
              className='btn btn-primary rounded-circle p-0' 
              aria-label='Send message'
            >
              <TbSend size={30} />
            </button>
          </div>
        </form>
        <div className='d-flex align-items-center' ref={emojiRef}>
          <BsEmojiSmile
            size={30}
            className='p-0 me-2'
            onClick={handleEmoji}
            aria-label='Toggle emoji picker'
          />
        </div>
      </div>
      {emoji && 
        <div className='emoji-container'>
          <Picker onEmojiSelect={addEmoji} />
        </div>
      }
      {isFile && 
        <div className='file-container mb-4'>
          <FileMenu chatId={chatId} />
        </div>
      }
    </>
  );
};

export default AppLayout(MessageBox);
