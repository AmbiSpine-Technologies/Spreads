import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Group as GroupIcon,
  Close as CloseIcon,
  Message as MessageIcon,
  PeopleSharp as PeopleIcon,
  Dashboard as DashboardIcon,
  ExitToApp,
} from '@mui/icons-material';
import { useLocation, Link as RouterLink, Navigate } from 'react-router-dom';

const StyledLink = styled(RouterLink)(({ theme, active }) => ({
  textDecoration: 'none',
  color: active ? 'white' : 'black',
  backgroundColor: active ? 'black' : 'transparent',
  '&:hover': {
    color: active ? 'white' : 'gray',
  },
  borderRadius: '2rem',
  padding: '1rem 2rem',
}));

const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'User',
    path: '/admin/user',
    icon: <PeopleIcon />,
  },
  {
    name: 'Chats',
    path: '/admin/chat-management',
    icon: <GroupIcon />,
  },
  {
    name: 'Messages',
    path: '/admin/messages-management',
    icon: <MessageIcon />,
  },
];

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  const logoutHandler = () => {
    // Add logout logic here
  };

  if(!isAdmin) return <Navigate to="/admin"/>;

  return (
    <Grid container minHeight="100vh">
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          top: '1rem',
          right: '1rem',
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar logoutHandler={logoutHandler}/>
      </Grid>
      <Grid
        item
        md={8}
        lg={9}
        xs={12}
        sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}
      >
        {children}
      </Grid>
      <Drawer anchor="left" open={mobileOpen} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

const Sidebar = ({ w = '100%',logoutHandler }) => {
  const location = useLocation();
  return (
    <Stack width={w} direction="column" p="3rem" spacing="3rem">
      <Typography variant="h6" textTransform="uppercase" textAlign="center">
        Admin
      </Typography>
      <Stack spacing="1rem">
        {adminTabs.map((tab) => (
          <StyledLink
            key={tab.name}
            to={tab.path}
            active={location.pathname === tab.path}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              marginBottom="1rem"
            >
              {tab.icon}
              <Typography marginLeft="1rem" sx={{ fontSize: '0.8rem' }}>
                {tab.name}
              </Typography>
            </Stack>
          </StyledLink>
        ))}
        <StyledLink to="#" onClick={logoutHandler}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing="1rem"
          >
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </StyledLink>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
