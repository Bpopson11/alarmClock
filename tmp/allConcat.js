var pingPong = require('./../js/ping-pong.js').pingPong;

$(document).ready(function(){
  $('#pingpong').submit(function(event){
    event.preventDefault();

    var goal = $('#goal').val();
    var output = pingPong(goal);
    output.forEach(function(element){
      $('#solution').append("<li>" + element + "</li>");
    });


  });
});

exports.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 == 0) {
      output.push("ping-pong");
    } else if (i % 2 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
    } else  {
      output.push(i);
    }
  }
  return output;
}

$(document).ready(function(){
  $('#form').submit(function(event){
    event.preventDefault();
    var email = $('#email').val();
    $('#email').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
  });
});
