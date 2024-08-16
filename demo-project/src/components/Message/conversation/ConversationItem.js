import React, { Fragment } from 'react';
import { VscVerifiedFilled } from "react-icons/vsc";
import { CiGlobe } from "react-icons/ci";
import { Link } from 'react-router-dom';

import './ConversationItem.css';

const ConversationItem = ({ id, name, title, imageUrl, latestText, createAt, isActive, count }) => {
  const className = isActive ? 'conversation active' : 'conversation';

  return (
    <Fragment>
      <Link to={`/chat/${id}`} id='conversationItem'>
       <div className={className}>
       <div className='align-items-center d-flex gap-2'>
          <div>
            <img
              src={imageUrl}
              alt={name}
              width="50"
              height="50"
              className='rounded rounded-5 border'
            />
          </div>
          <div className='mt-3'>
            <h6 className='fs-6 fw-semibold' style={{ marginBottom: '-2px' }}>{name}</h6>
            <span className='badge rounded-pill bg-dark-subtle text-secondary fw-light p-0'>{title}</span>
            <p className='text-small text-success fw-semibold'>
               {count > 0 ? `New Message ${count}` : 'No new messages'}
             </p>
          </div>          
        </div>
       </div>
      </Link>
    </Fragment>
  );
};

export default ConversationItem;
