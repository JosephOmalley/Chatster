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

    const userMessage = useRef(); 
    const socket = io.connect(SERVER); //points client to server 
    const location = useLocation(); 

    const [messages, setMessages] = useState({message : "", name : ""});
    const [listOfChats, setChats] = useState([])
    const socketRef = useRef()


//     useEffect(() => {
//     socket.on("message", ({ name, message }) => {
//         setChats([...listOfChats, {name, message}])
//     })
// })

    useEffect(
        
        () => {
            console.log("asdf")
            socketRef.current = io.connect(SERVER)
            socketRef.current.on("message", ({ name, message}) => {
                setChats([...listOfChats, {name, message}])
            })
            return () => socketRef.current.disconnect()
            
        },
        [ listOfChats ]
    )
    

    const onMessageSubmit = (e) => {
        setMessages({name: location.state.username})
        e.preventDefault()
        console.log(messages)
        const {name, message} = messages
        socket.emit("message", {name, message})
        setMessages({message: "", name: location.state.username})
    }

    const renderChat = () => {
        return listOfChats.map(({message, name}, index) => (
            <div style={{ border: "black, solid, 5px", display: "relative", backgroundColor: "grey", width: "100px", marginLeft: "5px"}}key={index}>
                <p style={{color: "white", padding: "7px"}}> {name}: <br />{message}  </p> 
            </div>
        ))
    }

    const onTextChange = e => {
        setMessages({[e.target.name]: e.target.value, name: location.state.username})
        console.log(messages)
    }

//     function handleAddMessage(){
//         let room = location.state.roomNumber;
//         let name = location.state.username;
//         let message = userMessage.current.value;
//         console.log(room);
//         if (message === '') return
//         socket.emit('message', {name, message}) 
//         socket.on('message', ({name, message}) =>{
//             setChats([...listOfChats, {id: uuidv4(), message: message, name: name}])
//         })
        
//         userMessage.current.value = '';
// }
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