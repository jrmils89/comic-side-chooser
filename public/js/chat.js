window.onload = function() {
  console.log("Hell0");
  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', {msg: $('#m').val(), username: $('#m').attr("username")});
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    var username = $('#m').attr("username")
    var msgHol = $('<li>').text(msg.msg).addClass("message-li");
    var who = $('<a>').text(msg.username).addClass("chat-username").attr('href', '/profile/'+msg.username);
    if (msg.username == 'Anonymous') {
      who.removeAttr('href').addClass('disabled');
    }
    msgHol.prepend(who);
    $('#messages').append(msgHol).scrollTop(document.getElementById("messages").scrollHeight);
  });
}