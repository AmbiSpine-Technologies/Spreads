import React from 'react';
import './Message.css';

const MessageComponent = ({ isMyMessage, message }) => {
    const messageClass = isMyMessage ? 'you-message' : 'other-message';

    const imageThumbnail = !isMyMessage && (
        <img className="message-image" src={message.imageUrl} alt={message.imageAlt} />
    );

    return (
        <div className={`message-row ${messageClass}`}>
            <div className="message-content">
                {imageThumbnail}
                <div className="message-text">
                    {message.messageText}
                </div>
                <div className="message-time">{message.createdAt}</div>
            </div>
        </div>
    );
}

export default MessageComponent;
