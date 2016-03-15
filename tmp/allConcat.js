$(document).ready(function(){

  // Puts the time on the page
  setInterval(function() {
    $('#time').text(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, 100);

});
