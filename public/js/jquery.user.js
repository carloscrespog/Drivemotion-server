$(document).ready(function() {

	function msgReceived(msg){
        $clientCounter.html(msg.clients);
      }
 

        $clientCounter = $("#client_count");
 
        var socket = io.connect('http://localhost:3000 ');
        socket.on('message', function(msg){msgReceived(msg);});

});