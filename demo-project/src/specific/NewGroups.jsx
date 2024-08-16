import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SampleUser } from '../../constants/SampleData';
import UserItem from '../../Shared/UserItem';

const NewGroupsDialog = () => {
  
  const [groupName, setGroupName] = useState('');

  const [members, setMembers] = useState(SampleUser);
  const [selectedMember, setSelectedMember] = useState('');


  const selectMemberHandler = (id) => {
    
    
    setSelectedMember((prev)=>(prev.includes(id)?
    prev.filter((curElm)=>curElm !== id):[...prev,id]))
  };
  console.log(selectedMember)

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const isLoadingFriendRequest = false;

  const closeHandler=()=>{
    
  }

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle variant="h8" textAlign="center">New Group</DialogTitle>

        <TextField 
          placeholder="Group Name" 
          fullWidth 
          variant="outlined" 
          value={groupName}
          onChange={handleGroupNameChange}
        />

        <Typography variant='body1'>Members</Typography>

        <Stack spacing={1}>
          {members?.map((user) => (
            <UserItem
              key={user._id} 
              user={user}
              handler={selectMemberHandler}
              handlerLoading={isLoadingFriendRequest}
              isAdded={selectedMember.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" spacing={2} marginTop="1rem">
          <Button variant="text" color="error">Cancel</Button>
          <Button variant="contained">Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroupsDialog;
