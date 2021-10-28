import { useRef, useState, useEffect } from  "react"; 
import io from 'socket.io-client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import { useLocation } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

const SERVER = "http://localhost:5000"
function ChatEntry() {

    const userMessage = useRef(); 
    const socket = io.connect(SERVER); //points client to server 
    const location = useLocation(); 

    const [messages, setMessages] = useState({message : "", name : ""});
    const [listOfChats, setChats] = useState([])
    const socketRef = useRef()

    useEffect(
        
        () => {
            const room = location.state.roomNumber
            socketRef.current = io.connect(SERVER)
            socketRef.current.on(`message${room}`, ({ name, message}) => {
                setChats([...listOfChats, {name, message}])
            })
            return () => socketRef.current.disconnect()
        },
        [ listOfChats ]
    )
    

    const onMessageSubmit = (e) => {
        
        
        console.log("tryign to submit")
        setMessages({name: location.state.username})
        e.preventDefault()
        console.log(messages)
        const {name, message} = messages
        const room = location.state.roomNumber
        socket.emit("message", {name, message, room})
        setMessages({message: "", name: location.state.username})
    }

    const renderChat = () => {
        return listOfChats.map(({message, name}, index) => (
            <Paper elevation={3} sx={{ width: "100px", marginLeft: "5px"}} key={index}>
                <p style={{padding: "7px"}}> {name}: <br />{message}  </p> 
            </Paper>
        ))
    }

    const onTextChange = e => {
        console.log("ontextchange working")
        setMessages({[e.target.name]: e.target.value, name: location.state.username})
        console.log(messages)
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
        <form onSubmit={onMessageSubmit} >
        <TextField 
            name = "message" 
            value={messages.message}
            multiline 
            onChange={e => onTextChange(e)} 
            rows={2}

        />
        <Button type="submit" variant="contained" sx={{ bgcolor: 'secondary.main', height: "79px"}} >
        Send Message
        </Button>
        </form>
        
        </Box>
        </>
    );
}

export default ChatEntry;