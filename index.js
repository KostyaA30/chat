let express = require('express');
let http = require('http');
let sock = require('socket.io');

let app = express();
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

let server = http.createServer(app);
const port = 3000;
// const host = "192.168.30.91"
// server.listen(post, host, () => {
// 	console.log(`Listening to http://${host}:${port}`);
// });
server.listen(port);

connections = [];

let io = sock(server);

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