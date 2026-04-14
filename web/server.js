const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const AIOXBridge = require('./aiox-bridge');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const bridge = new AIOXBridge(io);

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Gerenciamento de conexões Socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Receber submissão de tarefa
    socket.on('task:submit', (instruction) => {
        bridge.runWorkflow(instruction);
    });

    // Receber aprovação do Forge
    socket.on('forge:approved', () => {
        console.log('Usuário APROVOU as mudanças do Forge.');
        bridge.handleUserDecision(true);
    });

    // Receber rejeição do Forge
    socket.on('forge:rejected', () => {
        console.log('Usuário REJEITOU as mudanças do Forge.');
        bridge.handleUserDecision(false);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor da interface web rodando em http://localhost:${PORT}`);
});
