module.exports = function(server) {
  // Require the message model so it can save messages
  var Message = require('../models/message.js');

  // Require socket and have it listen to the server
  var io = require('socket.io').listen(server);

  // On connection to the socket
  io.on('connection', function(socket){
    // When the socket gets something called 'chat message'
    socket.on('chat message', function(msg){
      // Create a new message
      var message = new Message(msg);
        message.save(function(err) {
          // Where error handling from failed save would go
      });
      // But still emit the message whether or not it was saved
      io.emit('chat message', msg);
    });
  });
}