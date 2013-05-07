$(document).ready(function() {


	var data = [],
	totalPoints = 20;

	dataInit();

	function msgReceived(msg){
		$clientCounter.html(msg.clients);
	}
	function eHealthReceived(msg){
		var eHealthData=msg.eHealth.split(";");
		var rbpm=eHealthData[0].split(":")[1];
		$("#heartRate").html(rbpm+' bpm');
		plot.setData([getData(rbpm)]);
		plot.draw();
		//getData(rbpm);
		$("#oxSat").html(eHealthData[1].split(":")[1]+ ' %');
		$("#skCond").html(eHealthData[3].split(":")[1]+ ' µS');
		$("#bdytmp").html(eHealthData[2].split(":")[1]+ ' ºC');
		//$eHealth.html(msg.eHealth);
		//console.log(msg.eHealth);
	}


	$clientCounter = $("#client_count");
	$eHealth = $("#eHealth");

	var socket = io.connect(window.location.hostname);
	var room="room";
	socket.emit('subscribe',room);
	//	socket.join('room');
	console.log(window.location.hostname);
	socket.on('message', function(msg){msgReceived(msg);});
	socket.on('data',function(msg){
		console.log("info received");
		eHealthReceived(msg);
	});

	function getData(rbpm){

		if (data.length > 0)
			data = data.slice(1);
			data.push(rbpm);
		var res = [];
		for (var i = 0; i < data.length; ++i) {
			res.push([i, data[i]]);
		}
		return res;
	}

	var plot = $.plot("#placeholder", [ data ], {
		series: {
				shadowSize: 0,	// Drawing is faster without shadows
				color : 'red'
			},

			yaxis: {
				min: 0,
				max: 100
			},
			xaxis: {
				show: false
			}
		});
	function dataInit(){

		for (var i = 0; i < totalPoints; ++i) {
			data.push([i,0]);
		}
	}
	
	

});