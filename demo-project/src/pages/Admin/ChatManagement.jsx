import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import Table from '../../specific/Table';
import { Avatar, Stack } from '@mui/material';
import { dashboardData } from '../../constant/SampleData';
import { transformImageUrl } from '../../lib/feature';
import AvatarCard from '../../Shared/AvatarCard';


const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.chats.map((i,index)=>
      ({...i,id:i._id,
        avatar:i.avatar.map((i)=>transformImageUrl(i,50)),
        members:i.members.map((i)=>transformImageUrl(i.avatar,50))
      
      })));
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 150, headerClassName: 'table-header' },
    {
      field: 'attachement',
      headerName: 'Attachment',
      width: 200,
      headerClassName: 'table-header',
      renderCell: (params) =>  <AvatarCard  avatar={params.row.avatar} max={"100"}/>,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 100,
      headerClassName: 'table-header',
    },
    {
      field: 'members',
      headerName: 'Members',
      width: 200,
      headerClassName: 'table-header',
      renderCell: (params) => 
        <AvatarCard  avatar={params.row.members} max={"100"}/>   
    },
    { field: 'content', headerName: 'Content', width: 400, headerClassName: 'table-header' },
    { field: 'totalMembers', headerName: 'Total Members', width: 150, headerClassName: 'table-header' },
    { field: 'totalMessages', headerName: 'Total Messages', width: 120, headerClassName: 'table-header' },
    { field: 'groupChat', headerName: 'Group Chat', width: 150, headerClassName: 'table-header' },
    {
      field: 'creator',
      headerName: 'Created By',
      width: 250,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
          <span>{params.row.creator.name}</span>
        </Stack>
      )
    },
  ];

  const heading = "All Chat";

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        heading={heading}
      />
    </AdminLayout>
  );
};

export default ChatManagement;
