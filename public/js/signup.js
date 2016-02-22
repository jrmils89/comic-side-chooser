window.onload = function() {

  var signupButton = document.getElementById("signup-button");
  if (signupButton) {
    document.getElementById("signup-button").addEventListener("click", function() {
      var data = $('#signup-form').serializeArray()
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