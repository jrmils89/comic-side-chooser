window.onload = function() {
  console.log('Hello');


  var marvelLoginButtonForm = document.getElementById("marvel");

  if (marvelLoginButtonForm) {
    document.getElementById("marvel").addEventListener("click", function () {
      var data = $('#login-form').serializeArray()
      $.post( "/login/marvel", data, function(result) {
          if (result.result.success) {location.href=result.result.href} else {
            console.log("Fail")
          }
      } );
    });
  };


  var dcLoginButtonForm = document.getElementById("dc");

  if (dcLoginButtonForm) {
    document.getElementById("dc").addEventListener("click", function () {
      var data = $('#login-form').serializeArray()
      $.post( "/login/dc", data, function(result) {
          if (result.result.success) {location.href=result.result.href} else {
            console.log("Fail")
          }
      } );
    });
  };

  $('.image-container-marvel').cycle({
      fx:     'fadeout',
      speed:   700,
      timeout: 1000
  });

  $('.image-container-dc').cycle({
      fx:     'fadeout',
      speed:   700,
      timeout: 950
  });


};
