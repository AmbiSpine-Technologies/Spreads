import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import Table from '../../specific/Table';
import { Avatar, Stack } from '@mui/material';
import { dashboardData } from '../../constant/SampleData';
import { transformImageUrl } from '../../lib/feature';
import AvatarCard from '../../Shared/AvatarCard';
import moment from 'moment';

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (dashboardData && dashboardData.messages) {
      setRows(dashboardData.messages.map((message) => ({
        id: message._id, 
        content: message.content,
        attachments: message.attachments ? message.attachments.map(img => transformImageUrl(img.url, 50)) : [], 
        sender: {
          name: message.sender ? message.sender.name : 'Unknown', 
          avatar: message.sender ? transformImageUrl(message.sender.avatar, 50) : '', 
        },
        createAt: message.createAt ? moment(message.createAt).format("MMMM DD YYYY") : 'Unknown', 
      })));
    } else {
      console.error("Dashboard data or messages are undefined");
    }
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, headerClassName: 'table-header' },
    {
      field: 'attachments',
      headerName: 'Attachment',
      width: 200,
      headerClassName: 'table-header',
      renderCell: (params) => <AvatarCard avatar={params.row.attachments} max={100} />,
    },
    { field: 'content', headerName: 'Content', width: 400, headerClassName: 'table-header' },
    {
      field: 'sender',
      headerName: 'Sent By',
      width: 250,
      headerClassName: 'table-header',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
          <span>{params.row.sender.name}</span>
        </Stack>
      ),
    },
    { field: 'createAt', headerName: 'Date', width: 150, headerClassName: 'table-header' }, 
  ];

  const heading = "All Message";

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        heading={heading}
        getRowId={(row) => row.id} 
      />
    </AdminLayout>
  );
};

export default MessageManagement;
