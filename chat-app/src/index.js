import express from 'express';
import http from 'http';
import { Filter } from 'bad-words';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateMessage, generateLocationMessage } from './utils/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirPath = join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Serve static files
app.use(express.static(publicDirPath));


// Socket.IO
io.on('connection', (socket) => {
    console.log('New WebSocket connection.');

    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }

        io.emit('message', generateMessage(message));
        callback();
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    })
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});