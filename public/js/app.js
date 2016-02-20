window.onload = function() {
  console.log('Hello');

  var marvelLoginButtonForm = document.getElementById("marvel");

  if (marvelLoginButtonForm) {
    document.getElementById("marvel").addEventListener("click", function() {
      var data = $('#login-form').serializeArray()
      $.post("/login/marvel", data, function(result) {
        if (result.result.success) {
          location.href = result.result.href
        } else {

          if (($('#failed-login').length)) {
            $('#failed-login').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          } else {
            $('.login-container').find("h1").after($('<div id="failed-login">Incorrect Username/Password</div>'));
          };
        };
      });
    });
  };

  var dcLoginButtonForm = document.getElementById("dc");

  if (dcLoginButtonForm) {
    document.getElementById("dc").addEventListener("click", function() {
      var data = $('#login-form').serializeArray()
      $.post("/login/dc", data, function(result) {
        if (result.result.success) {
          location.href = result.result.href
        } else {

          if (($('#failed-login').length)) {
            $('#failed-login').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          } else {
            $('.login-container').find("h1").after($('<div id="failed-login">Incorrect Username/Password</div>'));
          };
        };
      });
    });
  };

  $('.image-container-marvel').cycle({
    fx: 'fadeout',
    speed: 1200,
    timeout: 1800
  });

  $('.image-container-dc').cycle({
    fx: 'fadeout',
    speed: 1200,
    timeout: 2000
  });

  $("#edit-profile-button").click(function() {
    $( "input" ).prop( "disabled", false );
    $( "input" ).css("background-color", "white");
    $( "select" ).prop( "disabled", false );

    $('#edit-button-submit').css("display", "block");
    $('#edit-button-submit').removeAttr("disabled");
  })

};