import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import Table from '../../specific/Table';
import { Avatar } from '@mui/material';
import { dashboardData } from '../../constant/SampleData'; 
import { transformImageUrl } from '../../lib/feature';

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, headerClassName: 'table-header' },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 150,
      headerClassName: 'table-header',
      renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />,
    },
    { field: 'name', headerName: 'Name', width: 150, headerClassName: 'table-header' },
    { field: 'friends', headerName: 'Friends', width: 150, headerClassName: 'table-header' },
    { field: 'groups', headerName: 'Group', width: 150, headerClassName: 'table-header' },
    { field: 'username', headerName: 'Username', width: 150, headerClassName: 'table-header' },
  ];

  const heading = "All User Table";

  useEffect(() => {
    if (dashboardData && dashboardData.users) {
      setRows(dashboardData.users.map(user => ({
        id: user._id, // Ensure `id` is set from `_id`
        avatar: transformImageUrl(user.avatar, 50), // Transform avatar URL
        name: user.name,
        friends: user.friends,
        groups: user.groups,
        username: user.username,
      })));
    }
  }, []);

  return (
    <AdminLayout>
      <Table
        rows={rows}
        columns={columns}
        heading={heading}
        getRowId={(row) => row.id} // Ensure `DataGrid` uses the `id` field for unique identification
      />
    </AdminLayout>
  );
};

export default UserManagement;
