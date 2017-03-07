
$(document).ready(function(){
  console.log("loaded")
  var idleTime = 0;

  function timerIncrement() {
      idleTime = idleTime + 1;
      if (idleTime > 9) { // 10 minutes
        window.location.replace('/success');
      }
  }

  var DIV1 = $('#thisdiv').get(0);
  DIV1.scrollTop = DIV1.scrollHeight;
  setInterval(function(){
    console.log("attempting")
    $.ajax({
      url: '/refresh',
      method: 'HEAD',
      statusCode: {
        200: function() {
          console.log("Success!");
          $('#outerdiv').load('/chatroom #thisdiv', function(){
            var DIV2 = $('#thisdiv').get(0);
            DIV2.scrollTop = DIV2.scrollHeight;
          });
        },
        401: function() {
          window.location.replace('/')
        },
        410: function() {
          window.location.replace('/success')
        },
      }
    })
  }, 1500);


  //Increment the idle time counter every minute.
  var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
  //Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
    idleTime = 0;
  });
  $(this).keypress(function (e) {
    idleTime = 0;
  });



});
