$(document).ready(function() {

	function msgReceived(msg){
		$clientCounter.html(msg.clients);
	}
	

	$clientCounter = $("#client_count");
	
	var socket = io.connect(window.location.hostname);
	socket.on('message', function(msg){msgReceived(msg);});

});