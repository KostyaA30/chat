let express  =  require('express');
let app  =  express();
let server  =  require('http').createServer(app);
let sock  =  require('socket.io');

let io  =  sock(server);

server.listen(3000);

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

connections  =  [];

io.on('connection', function(socket) {
	console.log("Успешное соединение");
	connections.push(socket);

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});
	
	socket.on('send name', function(data) {
		io.sockets.emit('add name', {name: data.name, className: data.className});
	});
	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});