var socket = io();


socket.on('connect',function(){
    console.log('connected to server');
    // socket.emit('createEmail',{
    //     to: 'jen@example.com',
    //     text: 'hey this is kumar'
    // });

    // socket.emit('createMessage',{
    //     from: 'kumar',
    //     text: 'works for me'
    // });
});

socket.on('disconnect',function(){
    console.log('Disconnectd from server');
});

socket.on('newEmail', function(email){
    console.log('new Email',email);
});

socket.on('newMessage',function(message){
    console.log('newMessage : ',message);
    var li =jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from: 'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('got it! ',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(){

    });
});