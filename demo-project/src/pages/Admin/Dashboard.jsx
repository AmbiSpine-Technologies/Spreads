import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { Box, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import { AdminPanelSettings, Chat, Group, Message, Notifications, Person } from '@mui/icons-material';
import moment from 'moment';
import { CurvBtn, SearchField } from '../../styles/StyleComponent';
import { DoughnutChartComponent, LineChartComponent } from '../../specific/Chart';

const Widget = ({ title, value, Icon }) => (
  <Paper elevation={3} sx={{
    borderRadius: "1rem",
    width: "20rem",
    margin:"2rem 0"
  }}>
    <Stack alignItems={"center"} spacing={"1rem"}  margin={"1rem"}>
      <Typography
        sx={{
          color: "gray",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} >
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

const Widgets = (
  <Stack
    direction={{
      xs: "column",
      sm: "row"
    }}
    spacing={"2rem"}
    justifyContent={"space-between"}
    alignItems={"center"}
    margin={"2rem"}
  >
    <Widget title={"Users"} value={34} Icon={<Person />} />
    <Widget title={"Chats"} value={4} Icon={<Chat />} />
    <Widget title={"Messages"} value={456} Icon={<Message />} />
  </Stack>
);

const Dashboard = () => {
  const AppBar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />
        <SearchField type='text' />
        <CurvBtn>Search</CurvBtn>
        <Box flexGrow={1}>
          <Typography
            variant='body1'
            sx={{
              display: { xs: "none", lg: "block" }
            }}
          >
            {moment().format("Do MMMM YYYY")}
          </Typography>
        </Box>
        <IconButton>
          <Notifications sx={{ fontSize: "2rem", color: "black" }} />
        </IconButton>
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>{AppBar}</Container>

      <Stack
        direction={{
          xs:"column",
          lg:"row"
        }}
        spacing={"2rem"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={{
           xs:"center",
          lg:"stretch"
        }}
      >
        <Paper elevation={3}
          sx={{
            padding: "2rem 3rem",
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "35rem"
          }}
        >
          <Typography variant='h5' margin={"2rem 0"}>Last Messages</Typography>
          <LineChartComponent value={[23,56,33,67,33]}/>
        </Paper>
        <Paper elevation={3}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            maxWidth: "22rem"
          }}
        >
          <DoughnutChartComponent labels={["Single Chats","Groups Chats"]} value={[33,66]}/>

          <Stack
            position={"absolute"}
            direction={"row"}
            justifyContent={"center"}
            spacing={"0.5rem"}
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
          >
            <Group />
            <Typography>Vs</Typography>
            <Person />
          </Stack>
        </Paper>
      </Stack>

      {Widgets}
    </AdminLayout>
  );
};

export default Dashboard;
