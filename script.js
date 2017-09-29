$(document).ready(function() {
  $("#cityField").keyup(function() {
      var val = $("#cityField").val();
      $("#txtHint").html("");
      if (val != "") {
        var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + val;
        $.getJSON(url, function(data) {
          console.log(data);
          $.each(data, function(i, item) {
            $("<li class=\"city\">" + data[i].city + "</li>").hide().appendTo("#txtHint").fadeIn("slow");
          });
        });
      }
    })

  $("#weatherButton").click(function(e) {
    var value = $("#cityField").val();
    console.log(value);
    e.preventDefault();
    $("#displayCity").text(value);
    var weatherUrl = "https://api.wunderground.com/api/18b5068ea1ba5bd6/geolookup/conditions/q/Utah/";
    weatherUrl += value + ".json";
    console.log(weatherUrl);
    $.ajax({
      url: weatherUrl,
      dataType: "json",
      success: function(data) {
        console.log(data);
        var location = data['location']['city'];
        var temp_string = data['current_observation']['temperature_string'];
        var current_weather = data['current_observation']['weather'];
        var weather = "<ul>";
        weather += "<li>Location: " + location + "</li>";
        weather += "<li>Temperature: " + temp_string + "</li>";
        weather += "<li>Weather: " + current_weather + "</li>";
        weather += "</ul>";
        $("#weather").html(weather);
      }
    });
  });

  $("#searchButton").click(function(e) {
    var value = $("#searchStack").val();
    console.log(value);
    e.preventDefault();
    var stackUrl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=" + value + "&site=stackoverflow";
    $.ajax({
      url: stackUrl,
      dataType: "json",
      success: function(data) {
        console.log(data);
        //do something with #searchResults
        $("#searchResults").html("");
        $.each(data.items, function(i, item){
          var link = data.items[i].link;
          var title = data.items[i].title;
          var a = "<li><a href=\"" + link + "\">" + title + "</a></li>";
          $(a).hide().appendTo("#searchResults").fadeIn("slow");
        });
      }
    });
  });
});