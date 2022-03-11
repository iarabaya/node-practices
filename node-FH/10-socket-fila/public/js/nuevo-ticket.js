const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const createBtn = document.querySelector('button');
const socket = io();

socket.on('connect', () => {

  createBtn.disabled = false;

});

socket.on('disconnect', () => {
    
  createBtn.disabled = true;

});

socket.on('last-ticket', (last) =>{
  lblNuevoTicket.innerText = 'Ticket ' + last;
});


createBtn.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null , ( ticket ) => {
        console.log('Desde el server', ticket );
        lblNuevoTicket.innerText = ticket;
    });

});