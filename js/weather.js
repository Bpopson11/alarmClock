var apiKey = "27b0c263f640ffcf06a8e01b620e6172";

$(document).ready(function() {

  $.get('http://api.openweathermap.org/data/2.5/weather?zip=97204,US&appid=' + apiKey, function(response) {
    $('#weather').text('Currently, the weather is ' + response.weather[0].description);
    console.log(response.weather[0].description);
    $('#temperature').text(Math.floor(response.main.temp * 9/5 - 459.67) + " degrees fahrenheit");
  });
});
