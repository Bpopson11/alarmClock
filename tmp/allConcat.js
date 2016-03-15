$(document).ready(function(){

  var alarm = null;

  // A trigger for submit of alarm form, sets a value for an alarm time
  $('#alarm').submit(function(event) {
    event.preventDefault();
    var alarm_time = $('#alarm_time').val();
    var alarm_date = moment().format('MM-DD-YYYY');
    var alarm_datetime = alarm_date + ' ' + alarm_time;
    alarm = new Date(alarm_datetime);
  });

  // refresh display and check alarm function
  var refreshAndCheck = function() {
    $('#time').text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    // conditional to check for alarm
    if (alarm && alarm <= moment()) {
      console.log("ALARM!");
      alarm = null;
    }
  };

  // Keeping the page updated with now
  setInterval(refreshAndCheck, 100);


});
