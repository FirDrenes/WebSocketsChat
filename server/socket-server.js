"use strict";
exports.__esModule = true;
var ws_1 = require("ws");

var socketServer = new ws_1.WebSocket.Server({ port: 9000 });
socketServer.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

var socketUsers = new Set();
console.log('Socket server started');
socketServer.on('connection', function (socket, req) {
    socket.id = socketServer.getUniqueID();
    socketUsers.add(socket);
    console.log("Connected socket " + socket.id);

    let uid = socket.id;
    let message = { message: {type: "INIT_MESSAGE"}, uid: socket.id};
    let messageRepr = JSON.stringify(message);
    socket.send(messageRepr);
    console.log('init message send');

    socket.on('message', function (receivedData) {
        let receivedDataJson = JSON.parse(receivedData.toString());
        let sendData = {message: receivedDataJson, uid: socket.id};
        var message = JSON.stringify(sendData);
        socketUsers.forEach(function (user) {
            user.send(message);
            console.log('message send');
        });
    });
});
