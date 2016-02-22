window.onload = function() {
  // Get the marvel login form
  var marvelLoginButtonForm = document.getElementById("marvel");
  // If it's gotten the form data
  if (marvelLoginButtonForm) {
    // Add a click event to the form
    document.getElementById("marvel").addEventListener("click", function() {
      // Get the data from the login form and serialize it
      var data = $('#login-form').serializeArray()
      // Send an ajax post to the marvel login endpoint
      $.post("/login/marvel", data, function(result) {
        if (result.result.success) {
          // If the response is a success, redirect the user to the result endpoint being sent back
          location.href = result.result.href
        } else {
          // If it's a fail
          // If they've already failed, flash the failed message a couple times to alert the user
          if (($('#failed-login').length)) {
            $('#failed-login').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          } else {
            // Otherwise if it's the first fail, then append a failure message after the header
            $('.login-container').find("h1").after($('<div id="failed-login">Incorrect Username/Password</div>'));
          };
        };
      });
    });
  };

  // This does all the same things as the marvel login endpoint, just hitting the DC login endpoint instead
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

  // This is code to cycle through the images on the login page, it depends on a jquery library called cycle
  $('.image-container-marvel').cycle({
    fx: 'fadeout',
    speed: 1200,
    timeout: 1800
  });
  // This is code to cycle through the images on the login page, it depends on a jquery library called cycle
  $('.image-container-dc').cycle({
    fx: 'fadeout',
    speed: 1200,
    timeout: 2000
  });
};