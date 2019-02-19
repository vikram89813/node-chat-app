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

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');;
        alert('unable to fetch location');
    });
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

