const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

    //Добавляем сокет в комнату игры
    socket.on("startGame", gameId => {
        const roomId = 'game_id_' + gameId;
        socket.join(roomId);
    });

    //При обновлении данных игры, ищем сокеты и отправляем новые данные
    socket.on("updateGame", (gameData) => {
        const roomId = 'game_id_' + gameData.id;

        io.in(roomId).fetchSockets().then(sockets => {
            for (const socket of sockets) {
                socket.emit('updateGame', gameData);
            }
        });
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
