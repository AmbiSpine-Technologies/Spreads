import React from 'react';
import { fileFormat } from '../../../lib/feature.js';
import RenderAttachement from '../../../Shareds/RenderAttachement.jsx';
import { PiDotsThreeCircleVerticalLight } from 'react-icons/pi'; 
import './MessageItem.css';
import moment from 'moment';

const MessageItem = ({ message, user }) => {
  const { content, attachements = [], sender, createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const messageClass = sameSender ? 'message-item sender' : 'message-item receiver';
  console.log(sender)
  return (
    <div className={messageClass}>
      <PiDotsThreeCircleVerticalLight size={20} className='icon ' />
      <div className='p-2 rounded-2 d-flex flex-column bg-white gap-0'>
        {!sameSender && (
          <span className="sender-name" style={{fontSize:"0.8rem",fontFamily:'cursive'}}>
            {sender.firstName} {sender.lastName} 
          </span>
        )}

        <span className="p-1 rounded-5 text-success bg-white" style={{fontSize:"0.8rem",fontFamily:'cursive'}}>
          {content}
        </span>

        {attachements.length > 0 &&
          attachements.map((atta, index) => {
            const url = atta.url;
            const file = fileFormat(url);
            return (
              <div key={index}>
                <a href={url} target='_blank' rel="noopener noreferrer" className="attachment-link" download>
                  {RenderAttachement(url, file)}
                </a>
              </div>
            );
          })
        }

        <span className="timestamp">
          {moment(createdAt).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
