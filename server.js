var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

// Configure the port to run in
var port = process.env.port || 81;

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// start listening for HTTP connections
app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connect', function (socket) {
  socket.emit('handshake', { hello: 'world' });
  socket.emit('handshake', { port: port });

  socket.on('rfid', function (data) {
    socket.emit('rfid', data);
  });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});