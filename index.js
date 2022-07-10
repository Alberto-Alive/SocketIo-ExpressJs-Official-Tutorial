//!Colorful Comments Guide: & ! ^ ? * ~ TODO
const express = require('express'); //^ initialise the variable express with the express object
const app = express(); //^ start the server
const http = require('http'); //^ initialise the variable http with the http object
const server = http.createServer(app); //^ initialise the variable server with the object created by http.createServer method, passing it the app object. 

const { Server } = require('socket.io'); //^ initialise the variable Server with the property Server found in scoket.io object : google what does const { variable } = require('xxx') mean?
const io = new Server(server); //^ create a new socket.io server using already exisitng express.js server linked over http (is an object)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected on socket: ', socket.id, socket.connected);
    io.emit('new user has connected', (socket.id))
    socket.on('disconnect', () => {
        console.log('The user disconnected on socket: ', socket.id, socket.disconnected);
    });
    socket.on('message from client to server', (msg) => {
        io.emit('message from server to client', msg)
        console.log('message: ' + msg);
    });
}) //^ What's happening here? We listen for a connection (when we load the index.html), then we take the socket and display whether we are connected to the socket or not.
   //! We then listen to see if the user has disconnected/exited from the socket s/he just connected.
   //* Note that whenever we reconnect the socket id changes to a new one.
   //^ We listen on the socket for a specific event called 'chat message' then we take that message and console.log it.

server.listen(3000, () => {
  console.log('listening on *:3000');
}); //^ This is making the server to listen ~ start on port 3000.