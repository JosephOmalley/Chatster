import React, { useState, useEffect, useContext } from "react";
import io from 'socket.io-client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

function Welcome(props) {
  
  const history = useHistory();

  const [data, setData] = useState('') // gets data from express server on port: 5000

  const [choosenUserName, getUserName] = useState('');// holds information on the state of the selected user name

  const [choosenRoom, getRoom] = useState(''); // holds information on the state of the selected room

  const [userNameEmpty, checkIfUserNameEmpty] = useState(false); // controls state of error message for username field

  const [roomEmpty, checkIfRoomEmpty] = useState(false); // controls error message for room field  

  const [room, setRoom] = useState('') // keeps state of the label value of the select room field



  

  const tryToEnterRoom = () => {
    checkIfRoomEmpty(false)
    checkIfUserNameEmpty(false)
    if (choosenRoom.length !== 0 && choosenUserName.length !== 0 ){
    history.push({
      pathname: "/chat",
      state: {username: choosenUserName}

  })
    }
    if (choosenRoom.length === 0){
    checkIfRoomEmpty(true)
    }
    if (choosenUserName.length === 0){
    checkIfUserNameEmpty(true)
      }
    console.log("error one or more fields are blank ")
  }

  return (
    <Box
    sx={{
      height: '100vh',
      width: '100%',
      bgcolor: 'secondary.main', 
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      }}>
      <h2>{!data ? "Loading..." : data}</h2> 

    <Box 
    sx={{
      height: 300,
      width: 300,
      bgcolor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    }}>
      
      {/* <TextField id="standard-basic" label="Enter user name..."  sx={{ m: 1, minWidth: 120, width: 238 }}/> */}
      
      
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Stack spacing={2}>
        
      <h2>Welcome, {choosenUserName}</h2>
      
      
      
     
          <TextField  error={userNameEmpty} id="standard-basic" onChange={(event) => getUserName(event.target.value)} label="Enter user name" />

      <InputLabel id="demo-simple-select-standard-label" sx={{position: 'absolute', top: '144px'}} >Choose a room</InputLabel>

        <Select error={roomEmpty} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={room} label="Choose a room" onChange={(event) => { getRoom(event.target.value); setRoom(event.target.value);}}>
            <MenuItem value="1">room 1</MenuItem>
            <MenuItem value="2">room 2</MenuItem>
            <MenuItem value="3">room 3</MenuItem>
        </Select>
    
        <Button onClick={tryToEnterRoom} variant="outlined" color="primary">
          Enter Room
        </Button>
        
        </Stack>
        </FormControl>
        
    </Box>
    </Box>
  );
}


export default Welcome;
