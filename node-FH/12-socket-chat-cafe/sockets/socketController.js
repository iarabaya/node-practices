const { Socket } = require("socket.io");
const { authenticateJWT } = require("../helpers");
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async ( socket = new Socket(), io) => {

    const token = socket.handshake.headers['x-token'];
    const user = await authenticateJWT(token);
    if(!user) {
        return socket.disconnect();
    }

    //add connected user
    chatMessages.connectUser(user);
    console.log('Is connected', user.name);
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('receive-message', chatMessages.lastMessages);

    //connect to special room
    socket.join(user.id);
    
    //clean disconnected user
    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.id)
        io.emit('active-users', chatMessages.usersArr);
    })

    socket.on('send-message', ({uid, message}) => {

        if(uid){
            //private message
            socket.to(uid).emit('private-message',{ from: user.name, message });
        }else{
            chatMessages.sendMessage(user.id, user.name, message);
            io.emit('receive-message', chatMessages.lastMessages);
        }
    })

}

module.exports = {
    socketController
}