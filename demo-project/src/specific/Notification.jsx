import React, { memo } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { SampleNotification } from '../../constants/SampleData.js';

const NotificationDialog = () => {

  const friendRequestHandler = (_id, accept) => {
    console.log(`Friend request ${accept ? 'accepted' : 'rejected'} for ID: ${_id}`);
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {SampleNotification.length > 0 ? (
          SampleNotification.map((i, index) => (
            <NotificationItem
              key={i._id}
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Data</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack width={"100%"} direction="row" alignItems="center" spacing={2}>
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient:"vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"100%"
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{
          xs:"column",
          sm:"row"
        }}>
          <Button
            color="primary"
            onClick={() => handler(_id, true)}
          >
            Accept
          </Button>
          <Button
            color="error"
            onClick={() => handler(_id, false)}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationDialog;
