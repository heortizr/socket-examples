const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = comunicacion del backend
let io = socketIO(server);

io.on('connection', (client) => {
    console.log('cliente conectado');
    //console.log(client);

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // escuchar a cliente
    client.on('enviarMensaje', (message) => {
        console.log(message);
    });
});

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});