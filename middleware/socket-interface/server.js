module.exports = function(io, user) {
  var namespaceMessage = io.of('/messages'); // create a message namespace
  namespaceMessage.on('connection', function(socket) {
    // TODO: On connection, a room is auto created with the connection id.
    //    If possible we should should not allow this. Helpful links below
    //    http://stackoverflow.com/questions/35304622/socket-io-1-0-0-using-the-default-room-vs-a-custom-room-for-user-specific-com
    //    http://stackoverflow.com/questions/37504319/socket-io-disable-automatical-joining-a-room-identified-by-sockets-id
    socket.on('joinRoom', function(data) {
      socket.join(data.room);
      // print all connected rooms
      //console.log(namespaceMessage.adapter.rooms);
    });
    socket.on('disconnect', function(data) {
      // TODO: Do something on disconnect
    });
    socket.on('sendMessage', function(data) {
      // TODO: Add message to database and if successful then broadcast newMessage
      socket.broadcast.to(data.room).emit('newMessage', data);
    });
  });



  /*
  user.findOrCreateUser({displayName: 'dname', email: 'email', uid: 'uid1'})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log("Catch handler " + e)
  });
  */
}

