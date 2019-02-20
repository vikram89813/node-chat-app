const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
 
io.on('connection',(socket)=>{
    // console.log('new user connected');
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //socket.leave('room name');
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });

    // socket.emit('newEmail',{
    //     from: 'mike@example.com',
    //     text: 'what is going on',
    //     createAt: 123
    // });

    socket.on('disconnect',()=>{
        // console.log('user was disconnected.');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
    });

    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail: ',newEmail);
    // });

    socket.on('createMessage',(message,callback)=>{
        //console.log('create message : ',message);
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            //emit to all
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();

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

    socket.on('createLocationMessage',(coords)=>{
        // io.emit('newMessage',generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`));
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });
});

server.listen(port,()=>{
    console.log('Server is on port : ', port);
});

