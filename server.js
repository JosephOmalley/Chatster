const http = require('http');
const express = require('express');
const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
    });

const PORT = process.env.PORT || 5000; 

server.listen( PORT, () => {
    console.log(`Server being run on port ${PORT}`);
}); 

//get route for react
app.get('/api', (req, res) => {
    res.json({ message: 'you know this if from your express server '});
})


io.on('connection', socket => {
    socket.on('message', ({name, message, room}) => {
        console.log(message)
        io.emit(`message${room}`, {name, message})
    })

})



// add join and disconnect messages. 

// connect to mongo database