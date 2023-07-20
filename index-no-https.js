// Setup basic express server
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;


// Variables
let valore = 0;
let connesso = false;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Routing
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
	socket.on('label', (data) => socket.broadcast.emit('label', data))
	console.log('Client connected: ' + socket.id)
	socket.on('disconnect', () => console.log('Client has disconnected'))
});


