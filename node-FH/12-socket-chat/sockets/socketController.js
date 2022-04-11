const { Socket } = require("socket.io");

const socketController = ( socket = new Socket ) => {
    console.log('client connected', socket.id);
}

module.exports = {
    socketController
}