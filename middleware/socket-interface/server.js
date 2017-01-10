module.exports = function(io, userService, messageService) {
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
  userService.findOrCreateUser({display_name: 'dname', email: 'email', uid: 'uid1'})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log("Catch handler " + e)
  });

  messageService.addMessage({text: 'text', uid: 'uid1', contact_number: '(900)897-1232', is_incoming: 1, sent_date: 1483734433})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log("Catch handler " + e)
  });

  messageService.getMessagesBeforeDateFromNumber({quantity: 5, uid: 'uid1', contact_number: '(900)897-1232', before_date: 1483978989})
  .then(function(data) {
    console.log(data);
    console.log(data[0].is_incoming == false);
  })
  .catch(function(e) {
    console.log("Catch handler " + e)
  });

  messageService.getMostRecentMessageFromContacts({uid: 'uid1', contact_numbers: ['(900)897-1232', '1', '2', '3']})
  .then(function(data) {
    console.log(data);
  })
  .catch(function(e) {
    console.log("Catch handler " + e)
  });
  */
}

