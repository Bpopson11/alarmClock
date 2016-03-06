$(document).ready(function(){
  $('#form').submit(function(event){
    event.preventDefault();
    var email = $('#email').val();
    $('#email').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
  });
});
