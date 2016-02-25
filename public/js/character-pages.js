window.onload = function() {
  var socket = io();

  $('#chat').submit(function() {
    socket.emit('chat message', {
      msg: $('#m').val(),
      username: $('#m').attr("username")
    });
    $('#m').val('');
    return false;
  });

  // Load the previous messages on page load
  $.get("/messages/json", function(data) {

    // For the reponse loop through it creating the HTML
    for (var i = 0; i < data.length; i++) {
      // Add the message
      var msgHol = $('<li>').text(data[i].msg).addClass("message-li");
      // Add the username, removing the link if it's 'Anonymous'
      var who = $('<a>').text(data[i].username).addClass("chat-username").attr('href', '/profile/' + data[i].username);
      if (data[i].username == 'Anonymous') {
        who.removeAttr('href').addClass('disabled');
      }
      // Adding the username to the message and adding the message to the chat container
      msgHol.prepend(who);
      $('#messages').append(msgHol);
    }
    // Scroll to the bottom of the div after it's done appending the messages
    $('#messages').scrollTop(document.getElementById("messages").scrollHeight);
  });

  // When a message is sent
  socket.on('chat message', function(msg) {
    // Get the username of the user who's doing the sending
    var username = $('#m').attr("username")
      // Create the li elemenet with the msg being sent
    var msgHol = $('<li>').text(msg.msg).addClass("message-li");
    // Add the username and make it a link to their profile
    var who = $('<a>').text(msg.username).addClass("chat-username").attr('href', '/profile/' + msg.username);
    // If it's an Anonymous user remove the link
    if (msg.username == 'Anonymous') {
      who.removeAttr('href').addClass('disabled');
    }
    // Add the username and the message to the chat container and scroll to the bottom of the div
    msgHol.prepend(who);
    $('#messages').append(msgHol).scrollTop(document.getElementById("messages").scrollHeight);
  });


  //!! START OF IMPORTANT !!//
  // Moving this above the socket stuff breaks the autocomplete. Also moving it into it's own file breaks things.
  // Yay!
  $(function() {
    $("#search").autocomplete({
        minLength: 0,
        source: function(request, response) {
          $.ajax({
            url: window.location.pathname + "/search",
            dataType: "json",
            data: {
              q: request.term
            },
            success: function(data) {
              response(data);
            }
          });
        },
        focus: function(event, ui) {
          $("#search").val(ui.item.name);
          return false;
        },
        select: function(event, ui) {
          $("#search").val(ui.item.name);
          return false;
        }
      })
      .data("ui-autocomplete")._renderItem = function(ul, item) {
        return $("<li>")
          .append("<a href='" + window.location.pathname + "/characters/" + item.page_id + "'>" + item.name + "</a>")
          .appendTo(ul);
      };
  });
  //!!END OF IMPORTANT !!//

}