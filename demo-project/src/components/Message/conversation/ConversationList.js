import React, { useState, useEffect } from 'react';
import ConversationItem from './ConversationItem';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ConversationList = ({ chats }) => {
  const { id: chatId } = useParams(); // Get the current chat ID from the route parameters
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const count = useSelector((state) => state.messageAlerts[chatId]?.count || 0);

  useEffect(() => {
    const index = chats.findIndex(chat => chat._id === chatId);
    if (index !== -1) {
      setSelectedConversationIndex(index);
    }
  }, [chatId, chats]);

  const handleConversationItemSelected = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <div>
      {chats.map((item, index) => (
        <ConversationItem
          key={item._id} 
          id={item._id}
          name={item.name}
          title={item.groupChat ? "Group Chat" : "Single Chat"} 
          imageUrl={item.avatar}
          latestText={item.latestText || "No recent messages"} // Assuming latestText is part of your data
          createAt={item.createAt || "Just now"} // Assuming createAt is part of your data
          onConversationItemSelected={() => handleConversationItemSelected(index)}
          isActive={index === selectedConversationIndex}
          count={count} 
        />
      ))}
    </div>
  );
};

export default ConversationList;
