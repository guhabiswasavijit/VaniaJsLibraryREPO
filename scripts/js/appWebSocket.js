var socket;

function setConnected(connected) {
	$("#connect").prop("disabled", connected);
	$("#disconnect").prop("disabled", !connected);
}

function connect() {
	socket = $.simpleWebSocket(
    {
        url: 'ws://127.0.0.1:8082/websocket',
        timeout: 20000,
        attempts: 60,
        dataType: 'text', // optional (xml, json, text), default json
	    onOpen: function(event) {console.log("Connection Open")}, // optional event listener
        onClose: function(event) {console.log("Connection close")}, // optional event listener
        onError: function(event) {console.log("Connection error")}, // optional event listener
    }
	);
	socket.connect();
	socket.isConnected(function(connected) {console.log("Connection Open"+connected)});
}

function disconnect() {
	socket.removeAll();
    socket.close();
	console.log("Websocket is in disconnected state");
}

function sendData() {
	socket.send("I'm new to kafka");
}


$(function() {
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#connect").click(function() {
		connect();
	});
	$("#disconnect").click(function() {
		disconnect();
	});
	$("#send").click(function() {
		sendData();
	});
});