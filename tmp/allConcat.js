$(document).ready(function(){

  var alarm = null;
  $('#alarm_reset').hide();
  $('#snooze_set').hide();

  // A trigger for submit of alarm form, sets a value for an alarm time
  $('#alarm').submit(function(event) {
    event.preventDefault();
    var alarm_time = $('#alarm_time').val();
    var alarm_date = moment().format('MM-DD-YYYY');
    var alarm_datetime = alarm_date + ' ' + alarm_time;
    alarm = new Date(alarm_datetime);
    $('#alarm').hide();
    // populate the time to display for user what alarm time they set
    $('#alarm_set_time').text('Alarm has been set for ' + alarm.toLocaleTimeString() + '.');
    $('#alarm_reset').show();
  });

  $('#alarm_reset').submit(function(event) {
    event.preventDefault();
    alarm = null;
    $('#alarm').show();
    $('#alarm_reset').hide();
  });

  $('#snooze_set').submit(function(event) {
    event.preventDefault();
    alarm_string = moment().add(1, 'minutes').format('MM-DD-YYYY HH:mm');
    alarm = new Date(alarm_string);
    $('#snooze_set').hide();
    $('#alarm_set_time').text('Alarm has been set for ' + alarm.toLocaleTimeString() + '.');
  });

  // refresh display and check alarm function
  var refreshAndCheck = function() {
    $('#time').text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // conditional to check for alarm
    if (alarm && alarm <= moment()) {
      var i = 0;
      var alarmInterval = setInterval(function () {
          if (i % 2) {
            $('body').addClass('alarming');
            i++;
          } else {
            $('body').removeClass('alarming');
            i++;
          }
          if (i >= 11) {
            clearInterval(alarmInterval);
          }
        }, 500);
      alarm = null;
      $('#alarm').show();
      $('#snooze_set').show();
    }
  };

  // Keeping the page updated with now
  setInterval(refreshAndCheck, 100);


});

var apiKey = "27b0c263f640ffcf06a8e01b620e6172";

$(document).ready(function() {

  $.get('http://api.openweathermap.org/data/2.5/weather?zip=97204,US&appid=' + apiKey, function(response) {
    $('#weather').text('Currently, the weather is ' + response.weather[0].description);
    console.log(response.weather[0].description);
    $('#temperature').text(Math.floor(response.main.temp * 9/5 - 459.67) + " degrees Fahrenheit");
  });
});
