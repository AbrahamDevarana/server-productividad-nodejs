const socketIo = require('socket.io');

const io = socketIo();


const socketService = (server) => {
    
    // config
    console.log('Socket Service');

    io.attach(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        // count clients
        console.log('Clientes Conectados: ',io.engine.clientsCount);
        socket.on('disconnect', () => console.log('Client disconnected, Hay:', io.engine.clientsCount, 'clientes conectados'));
    });
}

module.exports = {
    socketService,
    io
}