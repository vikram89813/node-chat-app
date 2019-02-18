var socket = io();


socket.on('connect',function(){
    console.log('connected to server');
    // socket.emit('createEmail',{
    //     to: 'jen@example.com',
    //     text: 'hey this is kumar'
    // });

    socket.emit('createMessage',{
        from: 'kumar',
        text: 'works for me'
    });
});

socket.on('disconnect',function(){
    console.log('Disconnectd from server');
});

socket.on('newEmail', function(email){
    console.log('new Email',email);
});

socket.on('newMessage',function(message){
    console.log('newMessage : ',message);
});