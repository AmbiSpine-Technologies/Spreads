import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from '../../Shared/UserItem';
import { SampleUser } from '../../constants/SampleData';

const SearchDialog = () => {
  const [searchValue, setSearchValue] = useState('');

  const [users , setUsers]=useState(SampleUser)

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Perform search logic here (if needed)
  };

const addFreindHandler=()=>{

}

const isLoadingFrindRequest=false
  
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle>Find People</DialogTitle>
        <TextField
          label=""
          variant='outlined'
          size='small'
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <List>
          {users?.map((user, index) => (
            <UserItem user={user} handler={addFreindHandler} handlerLoading={isLoadingFrindRequest}/>
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
