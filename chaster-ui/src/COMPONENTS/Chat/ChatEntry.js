import react, { useRef, useState } from  "react"; 
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ChatCard from './Message'
import Paper from '@mui/material/Paper';
import Messages from './MessageList'
import { v4 as uuidv4 } from 'uuid';


function ChatEntry() {
    const [messages, setMessages] = useState([{ id: 1, message : "Hello Joe"}])
    
    const userMessage = useRef(); 
    
    function handleAddMessage(e){
        const messageTryingToPost = userMessage.current.value
        if (messageTryingToPost === '') return
        setMessages(prevMessages => {
            return [...prevMessages, {id : uuidv4(), name: messageTryingToPost}]
    })
    userMessage.current.value = null
}
    return (
        <>
        <Box className="a" sx={{height: '150px', width: '250px', overflowY: 'auto'}}> 
        
        <Messages messages={messages}/>

        

        
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