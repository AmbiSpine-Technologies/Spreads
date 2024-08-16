import React from 'react';
import { Container, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns, heading, rowHeight = 52, getRowId }) => {
  return (
    <Container sx={{ height: '100vh',margin:"1rem" }}>
      <Paper
        elevation={3}
        sx={{
          padding: '1rem 4rem',
          borderRadius: '1rem',
          margin: 'auto',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'none',
        }}
      >
       <Stack justifyContent={"center"} alignItems={"center"} >
       <Typography variant='h6' sx={{ margin: '2rem', textTransform: 'uppercase' }}>
          {heading}
        </Typography>
       </Stack>
        <div style={{ height: '80%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowHeight={rowHeight}
            getRowId={getRowId} // Use the getRowId prop
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'black',
                color: 'white',
              },
              '& .table-header': {
                bgcolor: "black",
                color: "white"
              }
            }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Table;
