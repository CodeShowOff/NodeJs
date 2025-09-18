import express from 'express';
import http from 'http';
import { Filter } from 'bad-words';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateMessage, generateLocationMessage } from './utils/messages.js';
import { addUser, removeUser, getUser, getUsersInRoom } from './utils/users.js';

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

    // available emits:
    // general: socket.emit, io.emit, socket.broadcast.emit
    // room specific: io.to.emit, socket.broadcast.to.emit

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });
        if (error) {
            return callback(error)
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin' ,`Welcome ${user.username}!`));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} left!`));
        }
    })
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});