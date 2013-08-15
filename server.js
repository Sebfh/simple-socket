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

io.sockets.on('connection', function (socket) {
  socket.emit('news', { message: 'world' });
  socket.emit('news', { port: port });
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('news', data);
  });
});