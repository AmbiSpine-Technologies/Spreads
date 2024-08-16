import React from 'react';
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width="5rem" height="3rem" position="relative">
          {avatar.map((avatarSrc, index) => (
            <Avatar
              key={avatarSrc} // Use a stable key, not Math.random() which can cause rerenders
              src={avatarSrc}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: `${0.3 + index * 1.5}rem`, // Adjust positioning as needed
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
