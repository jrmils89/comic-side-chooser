window.onload = function() {
  // This is is code that enables the user to edit their profile when the edit button is clicked
  $("#edit-profile-button").click(function() {
    console.log("clicked")
    // Enable the input and select fields which are disabled by default
    $( "input" ).prop( "disabled", false );
    $( "select" ).prop( "disabled", false );

    // Change the input background to white
    $( "input" ).css("background-color", "white");

    // Show the submit button and enable it. It is hidden and disabled by default
    $('#edit-button-submit').css("display", "block");
    $('#edit-button-submit').removeAttr("disabled");
  })
  // Set some defualt chart creation options to make it respond better
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.maintainAspectRatio = false;

  // Send an ajax call to get the data for the charts
  $.get( window.location.pathname+'/json', function( data ) {

    // Set some options for the charts. This sets the segment border width and color
    var options = {
      segmentStrokeWidth : 1,
      segmentStrokeColor : "black",
      scaleShowLabelBackdrop : false,
      scaleBeginAtZero : true
    }

    // Get the context for the chart
    var ctx = document.getElementById("marvel-male-female").getContext("2d");

    // Set a holder var for the data
    var myData = [
      {
        value: data.marvelFavorites.length,
        color: "#e23636",
        highlight: "#A8B3C5",
        label: "Marvel"
      },
      {
        value: data.dcFavorites.length,
        color: "#003F5E",
        highlight: "#A8B3C5",
        label: "DC"
      },
    ];
    // Create the Marvel Chart
    var myNewChart = new Chart(ctx).PolarArea(myData, options);
    document.getElementById("marvel-gender-legend").innerHTML = myNewChart.generateLegend();
  });
};