const socketController = (socket) =>{
  console.log('client connected', socket.id);

  socket.on('disconnect', () => {
      console.log('disconected client', socket.id);
  })

  socket.on('send-msg', ( payload, callback ) => {
      // console.log('message from client received ', payload);
      const id = 123456;
      callback( {id, date: new Date().getDate() });
      
      socket.broadcast.emit('send-message', payload);
  })
}

module.exports = {
  socketController
}