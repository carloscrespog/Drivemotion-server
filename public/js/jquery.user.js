$(document).ready(function() {

	function msgReceived(msg){
		$clientCounter.html(msg.clients);
	}
	function eHealthReceived(msg){
		$eHealth.html(msg.eHealth);
		console.log(msg.eHealth);
	}


	$clientCounter = $("#client_count");
	$eHealth = $("#eHealth");

	var socket = io.connect(window.location.hostname);
	console.log(window.location.hostname);
	socket.on('message', function(msg){msgReceived(msg);});
	socket.on('info',function(msg){
		eHealthReceived(msg);
	});

});