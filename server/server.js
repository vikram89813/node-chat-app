const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('new user connected');

    // socket.emit('newEmail',{
    //     from: 'mike@example.com',
    //     text: 'what is going on',
    //     createAt: 123
    // });

    socket.on('disconnect',()=>{
        console.log('user was disconnected.');
    });

    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail: ',newEmail);
    // });

    socket.on('createMessage',(message)=>{
        console.log('create message : ',message);
    });

    socket.emit('newMessage',{
        from: 'john',
        text: 'see you then',
        createAt: 123123
    });
});

server.listen(port,()=>{
    console.log('Server is on port : ', port);
});
