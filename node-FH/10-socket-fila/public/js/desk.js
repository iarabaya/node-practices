//References HTML
const lblDesk = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const btnAttend = document.querySelector('button');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('desk') ){
  window.location =  'index.html'
  throw new Error('You need to input an existent desk');
}

const desk =  searchParams.get('desk');
lblDesk.innerText = desk;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  btnAttend.disabled = false;
});

socket.on('disconnect', () => {
  btnAttend.disabled = true;
});

socket.on('pending-tickets', ( pending ) => {
  if(pending === 0){
    lblPendientes.style.display = 'none';
  }else{
    lblPendientes.style.display = '';
    lblPendientes.innerText = pending;
  }
})


btnAttend.addEventListener( 'click', () => {
  socket.emit( 'attend-ticket', { desk } , ( { ok, msg ,ticket } ) =>{
    if(!ok){
      lblTicket.innerText = 'Nadie'
      return divAlert.style.display = '';
    }

    lblTicket.innerText = 'Ticket ' + ticket.number;
  });
  

});