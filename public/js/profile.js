window.onload = function() {
  // This is is code that enables the user to edit their profile when the edit button is clicked
  $("#edit-profile-button").click(function() {
    // Enable the input and select fields which are disabled by default
    $( "input" ).prop( "disabled", false );
    $( "select" ).prop( "disabled", false );

    // Change the input background to white
    $( "input" ).css("background-color", "white");

    // Show the submit button and enable it. It is hidden and disabled by default
    $('#edit-button-submit').css("display", "block");
    $('#edit-button-submit').removeAttr("disabled");
  })
};