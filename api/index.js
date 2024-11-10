// api/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sharedContent = ''; // Store the notepad content

// Serve static files from the public folder
app.use(express.static('public'));

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
    // Send current content to new user
    socket.emit('content', sharedContent);

    // Update shared content and broadcast to others
    socket.on('updateContent', (data) => {
        sharedContent = data;
        socket.broadcast.emit('content', sharedContent);
    });
});

module.exports = (req, res) => {
    server.emit('request', req, res);
};
