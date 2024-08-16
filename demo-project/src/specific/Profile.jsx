import React from 'react';
import { Avatar, Stack } from "@mui/material";
import ProfileCard from '../../Shared/ProfileCard';
import { Face, AlternateEmail, CalendarToday } from "@mui/icons-material";
import moment from 'moment';

const Profile = () => {
  const icon = "url-to-avatar.jpg"; // Replace with actual icon URL
  const todayDate = moment().format('YYYY-MM-DD'); // Example format, adjust as needed

  return (
    <Stack alignItems="center" direction="column" spacing={2}>
      <Avatar
        src={icon}
        alt="Profile Avatar"
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white"
        }}
      />
      <ProfileCard Icon={<CalendarToday />} heading={"Bio"} text={"Hii,This is Dharmendra"} />
      <ProfileCard Icon={<AlternateEmail />} heading={"Username"} text={"Kdharmendra364@gmail.com"} />
      <ProfileCard Icon={<Face />} heading={"Name"} text={"Dharmendra Kumar"} />
      <ProfileCard Icon={<CalendarToday />} heading={"Date"} text={todayDate} />
    </Stack>
  );
};

export default Profile;
