const { Socket } = require("socket.io");
const { authenticateJWT } = require("../helpers");

const socketController = async ( socket = new Socket() ) => {
    console.log('client connected', socket.id);
    const token = socket.handshake.headers['x-token'];

    const user = await authenticateJWT(token);
    if(!user) {
        return socket.disconnect();
    }

    console.log('Is connected', user.name);
}

module.exports = {
    socketController
}