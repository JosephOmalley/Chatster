import React, { useState, useEffect } from "react";

import { useForm, ErrorMessage, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

function Welcome() {

  const [data, setData] = useState(null)
  
  const [choosenRoom, getRoom] = useState(''); // the state

  const getRoomValue = (e) => { getRoom(e.target.value); }

  const history = useHistory();

  const [roomEmpty, checkIfRoomEmpty] = useState(false); // if select room input is empty this hook updates the room Empty var  

  const [userNameEmpty, checkIfUserNameEmpty] = useState(false);

  const [choosenUserName, getUserName] = useState ('');

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  

  const getUserNameValue = (e) => { getUserName(e.target.value) }; 


  const tryToEnterRoom = () => {
    checkIfRoomEmpty(false)
    checkIfUserNameEmpty(false)
    if (choosenRoom.length !== 0 && choosenUserName.length !== 0 ){
    history.push("/chat");
    }
    if (choosenRoom.length === 0){
    checkIfRoomEmpty(true)
    }
    if (choosenUserName.length === 0){
    checkIfUserNameEmpty(true)
      }
    console.log("error one or more fields are blank ")
  }

  const [room, setRoom] = useState('');



  

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
      
      
      
     
          <TextField  error={userNameEmpty} id="standard-basic" onChange={getUserNameValue} label="Enter user name" />

      <InputLabel id="demo-simple-select-standard-label" sx={{position: 'absolute', top: '144px'}} >Choose a room</InputLabel>

        <Select error={roomEmpty} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={room} label="Choose a room" onChange={(event) => { getRoomValue(event); setRoom(event.target.value);}}>
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
