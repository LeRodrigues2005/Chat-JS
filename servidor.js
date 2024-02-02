const http = require('http');
const express = require('express');
const aplicacao = express();

const servidorHttp = http.createServer(aplicacao);
const io = require('socket.io')(servidorHttp);

io.addListener('connection', (socket) => {
    console.log('um usuário logou');
    socket.addListener('nova mensagem', (msg) => {
        io.emit('nova mensagem', msg);
    })
})

aplicacao.use(express.static('public'));

servidorHttp.listen(1000); // adicionar ip para que todos conectados na rede acessem. ex: .....listen(1000, '192.1.3.4')