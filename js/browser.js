$(document).ready(function(){

  var alarm = null;
  $('#alarm_reset').hide();

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

  $('#alarm_reset').submit(function() {
    alarm = null;
    $('#alarm').show();
    $('#alarm_reset').hide();
  });

  // refresh display and check alarm function
  var refreshAndCheck = function() {
    $('#time').text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // conditional to check for alarm
    if (alarm && alarm <= moment()) {
      console.log("ALARM!");
      alarm = null;
      $('#alarm').show();
    }
  };

  // Keeping the page updated with now
  setInterval(refreshAndCheck, 100);


});
