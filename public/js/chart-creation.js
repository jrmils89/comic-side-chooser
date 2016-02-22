window.onload = function() {
  // Set some defualt chart creation options to make it respond better
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.maintainAspectRatio = false;

  // Send an ajax call to get the data for the charts
  $.get( "/stats/gender/json", function( data ) {

    // Set some options for the charts. This sets the segment border width and color
    var options = {
      segmentStrokeWidth : 1,
      segmentStrokeColor : "black",
      scaleShowLabelBackdrop : false,
      scaleBeginAtZero : false
    }

    // Get the context for the chart
    var ctx = document.getElementById("marvel-male-female").getContext("2d");

    // Set a holder var for the data
    var myData = [];

    // Loop through the data to put it in the right structure for the object
    for (var i = 0; i < data.data.marvel.length; i++) {
      // Set the color of the segment for the gender
      if (data.data.marvel[i]._id == "Male Characters") {
        var colorLabel = '#e23636'
      } else if (data.data.marvel[i]._id == "Female Characters") {
        var colorLabel = '#518cca'
      } else {
        var colorLabel = '#f78f3f'
      }
      // Create the object for the graph and push it into the holder
      var obj = {
        value: data.data.marvel[i].value,
        color: colorLabel,
        highlight: "#A8B3C5",
        label: data.data.marvel[i]._id
      };
      myData.push(obj);
    }

    // Create the Marvel Chart
    var myNewChart = new Chart(ctx).PolarArea(myData, options);
    document.getElementById("marvel-gender-legend").innerHTML = myNewChart.generateLegend();

    // Get the DC Chart and do the same thing
    var ctx2 = document.getElementById("dc-male-female").getContext("2d");
    var secondData = [];

    for (var i = 0; i < data.data.dc.length; i++) {
      if (data.data.dc[i]._id == "Male Characters") {
        var colorLabel = '#003F5E'
      } else if (data.data.dc[i]._id == "Female Characters") {
        var colorLabel = '#00A9D9'
      } else {
        var colorLabel = 'white'
      };
      var obj = {
        value: data.data.dc[i].value,
        color: colorLabel,
        highlight: "#A8B3C5",
        label: data.data.dc[i]._id
      };
      secondData.push(obj);
      console.log(secondData);
    }
    // Create the DC chart
    var newChart = new Chart(ctx2).PolarArea(secondData, options);
    document.getElementById("dc-gender-legend").innerHTML = newChart.generateLegend();
  });

};