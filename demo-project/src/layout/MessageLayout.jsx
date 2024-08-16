import React from 'react';
import ChatBox from '../components/Message/ChatListBox';
import './messagelayout.css';
import { SocketProvider } from '../utlis/socket'; 

const MessageLayout = (WrappedComponent) => {
  return function LayoutComponent(props) {
    return (
      <SocketProvider>
        <div className='container-layout gap-1'>
          <div className='side-layout'>
          <ChatBox />
          </div>
          <div className='wrapped-layout'>
          <WrappedComponent {...props} />
          </div>
        </div>
      </SocketProvider>
    );
  };
};

export default MessageLayout;
