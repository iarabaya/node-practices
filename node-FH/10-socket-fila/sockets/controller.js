const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) =>{

  socket.emit('last-ticket', TicketControl.last);

  socket.on('next-ticket', ( payload, callback ) => {


    const next = ticketControl.nextTicket();
    callback( next );
    //TODO Notify that there is a new ticket to assign
      
      socket.broadcast.emit('send-message', payload);
  })
}

module.exports = {
  socketController
}