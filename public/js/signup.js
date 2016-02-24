window.onload = function() {

  var signupButton = document.getElementById("signup-button");
  if (signupButton) {
    document.getElementById("signup-button").addEventListener("click", function() {
      var data = $('#signup-form').serializeArray();
      var $email = $('form input[name="email');
      var $password = $('form input[name="password');

      // Regex for the email. Must have letter and numbers with an @ symbol and post @ needs to be between 2-4. So .co and .com work but not .c
      var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
      if ($email.val() == '' || !re.test($email.val())) {
        // If it's not valid show an error message or flash an already existing error message
        if (($('#failed-email').length)) {
              $('#failed-email').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            } else {
              $('#signup-header').after($('<div id="failed-email">Please Enter A Valid Email Address</div>'));
            };
          return false;
      };

      // Make sure there's a password and is at least 8 characters, otherwise fail
      if ($password.val() == '' || $password.val().length < 8) {
        // If it's not valid show an error message or flash an already existing error message
        if (($('#failed-password').length)) {
              $('#failed-password').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            } else {
              $('#signup-header').after($('<div id="failed-password">Password Needs To Be At Least 8 Characters</div>'));
            };
          return false;
      };

      // If the email and password are valid then go ahead and post the data
      $.post("/signup", data, function(result) {
        if (result.result.success) {
          location.href = result.result.href;
        } else {
          if (($('#failed-login').length)) {
            $('#failed-login').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          } else {
            $('#signup-header').after($('<div id="failed-login">Please Enter Valid Information</div>'));
          };
        };
      });
    });
  };

};