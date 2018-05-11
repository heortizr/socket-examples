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

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a la aplicacion'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // escuchar a cliente
    client.on('enviarMensaje', (message, callback) => {
        client.broadcast.emit('enviarMensaje', message);
        console.log(message);
        callback();
    });
});

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});