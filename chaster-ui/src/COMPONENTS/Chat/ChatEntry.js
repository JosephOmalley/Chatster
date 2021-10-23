import { useRef, useState, useEffect } from  "react"; 
import io from 'socket.io-client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Messages from './MessageList'
import { v4 as uuidv4 } from 'uuid';

const SERVER = "http://localhost:5000"
function ChatEntry() {


    const socket = io.connect(SERVER);

    const location = useLocation();

    const [messages, setMessages] = useState({ id: 1, message : "", name : ""});
    const [listOfChats, setChats] = useState([])


    // todo... 
    // right now you have the user name and message being stored in the 'messages' state varible
    // your backend code has socket io listening for name and username
    // so pass name and message from messages state varible to socket io backend
    // in your useEffect hook get the varible passed in prev step and update a new state varible that will be rendered to the client(s) 


    const renderChat = () => {
        return listOfChats.map(({ id, message, name}) => (
            <div key={id}>
                <h1> {message}  {name} </h1> 
            </div>
        ))
    }

    const userMessage = useRef(); 

    
    function handleAddMessage(e){
        let name = location.state.username;
        let message = userMessage.current.value;
        if (message === '') return
        socket.emit('message', {name, message})
        socket.on('message', ({name, message}) =>{
            setChats([...listOfChats, {id: uuidv4(), message: message, name: name}])

        })
        
        userMessage.current.value = '';
}
    return (
        <>
        <Box sx={{height: '450px', width: '450px', overflowY: 'auto'}}> 
        
        {renderChat()}

        </Box> 
        <Box
        sx={{
        position: 'relative',
        display: 'flex',
        bottom: '1px'
        }}
        >
        <TextField inputRef={userMessage} multiline rows={2} />
        
        <Button onClick={handleAddMessage} variant="contained" sx={{ bgcolor: 'secondary.main'}} rows={4}>
        Send Message
        </Button>
        
        </Box>
        </>
    );
}

export default ChatEntry;