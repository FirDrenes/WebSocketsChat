import {WebSocket} from "ws";

const socketServer = new WebSocket.Server({port: 9000});
const socketUsers = new Set<WebSocket>();
console.log('Socket server started');

socketServer.on('connection', (socket) => {
    socketUsers.add(socket);
    console.log(`Connected socket ${socket}`);
    socket.on('message', (data) => {
        const message = data.toString();
        socketUsers.forEach((user) => {
            user.send(message)
            console.log('messageSend')
        })
    });
})