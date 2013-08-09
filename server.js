var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

// Configure the port to run in the Windows Azure emulator
var port = process.env.port || 81;
// start listening for HTTP connections
app.listen(port);

console.log('listening on port:' + port);

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
  socket.emit('news', { hello: 'world' });
  socket.emit('news', { port: port });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});