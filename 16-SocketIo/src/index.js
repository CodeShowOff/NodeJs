import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirPath = join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(publicDirPath));


let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

// Socket.IO
io.on('connection', (socket) => {
    console.log('New WebSocket connection.');

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        // socket.emit('countUpdated', count);
        io.emit('countUpdated', count);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});