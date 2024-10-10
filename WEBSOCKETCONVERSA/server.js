const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = require();
const server = http.createServer(app);

const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let esperandoUsuario = null;

io.on('connection', (socket) =>{

    console.log("Um usuario se conectou");

    socket.on('set username', (username) => {
        socket.username = username;
        console.log(`${username} entrou na sala`);

        if (esperandoUsuario) {
            socket.partner = esperandoUsuario;
            esperandoUsuario.partner = socket;

            esperandoUsuario.emit('chat start', `Falando com: ${socket.username}`);
            socket.emit('chat start', `Falando com: ${esperandoUsuario.username}` );
        } else {
            esperandoUsuario = socket;
            socket.emit('waiting', "Aguardando por um usuario para papear...");
        }
    });

    socket.on('Chat message', `${socket.username}: ${msg}`);

    socket.on('manual disconnect', () =>{
        if ( socket.partner){
            socket.partner.emit('chat and', `${socket.username} desconectou`);
            socket.partner.partner = null;
            socket.partner = null;
        }
        socket.emit('chat end', 'Voce desconectou');
    });

    socket.on('disconnect', () => {
        console.log('Usuario se desconectou'); 
        if(socket.partner){
            socket.partner.emit('chat end', `${socket.username} desconectou`);
            socket.partner.partner = null;
        } else {
            if ( esperandoUsuario === socket){
                esperandoUsuario = null;
            }
        }
    })
    
});

server.listen(3000, () => {
    console.log("Servidor na porta 3000")
});