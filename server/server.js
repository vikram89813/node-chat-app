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

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message)=>{
        //console.log('create message : ',message);
        //emit to all
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        //this socket will not recive the return message all others will.
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    //emit to a particulat socket.
    // socket.emit('newMessage',{
    //     from: 'john',
    //     text: 'see you then',
    //     createAt: 123123
    // });
});

server.listen(port,()=>{
    console.log('Server is on port : ', port);
});

