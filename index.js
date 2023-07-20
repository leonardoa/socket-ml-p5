const fs = require("fs");

// Setup basic express server
const options = {
	cert: fs.readFileSync('cert.pem'),
	key: fs.readFileSync('key.pem')
  };
  

const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const server = require("https").createServer(options,app);
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
	socket.on('confidence', (data) => socket.broadcast.emit('confidence', data))
	console.log('Client connected: ' + socket.id)
	socket.on('disconnect', () => console.log('Client has disconnected'))
});


