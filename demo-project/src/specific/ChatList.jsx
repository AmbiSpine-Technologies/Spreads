import React from 'react';
import { Stack } from '@mui/material';
import ChatItems from '../../Shared/ChatItems';

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [{
    chatId: "1",
    count: 4
  }],
  handlerDeleteChat
}) => {
  return (
    <Stack width={w} direction={"column"}  sx={{overflow:"auto"}} height={"100%"}>
      {chats.map((data, index) => {
        const { avatar, _id, groupChat, name, members } = data;

        const alert = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <ChatItems
            newMessageAlert={alert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            _id={_id}
            sameSender={chatId == _id}
            key={_id}
            handlerDeleteChat={handlerDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
