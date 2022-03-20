const express = require('express');
const path    = require('path');
const http    = require('http');
const socket  = require('socket.io');

const app       = express();
const server    = http.createServer(app);
const io        = socket(server);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Run when client connects.
io.on('connection', socket =>{
    console.log("New Web Socket Connection");
    socket.emit('message','Welcome to ChatChord');

    socket.broadcast.emit('message',"New user has joined the chat");

    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });

    socket.on('chatMessage',msg =>{
       io.emit('message',msg)
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT,() => console.log(`Server is running on ${PORT}`))