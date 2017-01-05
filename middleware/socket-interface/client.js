var io = require('socket.io-client');
var socket = io.connect('http://localhost:1180/messages');

// TODO: Change room variable to the result from google api (the google account id)
//    see... http://stackoverflow.com/questions/8311836/how-to-identify-a-google-oauth2-user
var room = "abc123";

// TODO: Add a try to reconnect method

/*
 * Socket Recieving
 */
// TODO: Only connect when google oauth succeeds
socket.on('connect', function() {
  joinRoom(room);
});

socket.on('newMessage', function(data) {
  console.log('newMessage: ' + data);
});

/*
 * Socket Sending
 */
function sendMessage(msg) {
  socket.emit('sendMessage', {
    room: room,
    msg: msg
  });
}

function joinRoom(room) {
  socket.emit('joinRoom', {room: room});
}

