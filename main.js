/*
* Initialize app variable to be a function handler
* that you can pass to an HTTP server.
*/
var app = require('express')();

// HTTP server object is passed the Express function handler "app" variable.
var http = require('http').Server(app);

// Initialize new instance of socket.io object and pass it the HTTP server.
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Listen on connection event for incoming sockets.
io.on('connection', function(socket) {
  console.log('A user connected.');

  // chat message event.
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // Emit chat message to everyone including the sender with socket.io
    io.emit('chat message', msg);
  });

  // Each socket also fires a disconnect event.
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('Express server listening on port 3000!');
});
