//References HTML
const lblDesk = document.querySelector('h1');
const lblTicket = document.querySelector('small');
const btnAttend = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('desk') ){
  window.location =  'index.html'
  throw new Error('You need to input an existent desk');
}

const desk =  searchParams.get('desk');
lblDesk.innerText = desk;
// lblTicket.innerText = 

const socket = io();

socket.on('connect', () => {

  btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    
  btnAttend.disabled = true;

});

socket.on('last-ticket', (last) =>{
  // lblNuevoTicket.innerText = 'Ticket ' + last;
});


btnAttend.addEventListener( 'click', () => {

    // socket.emit( 'next-ticket', null , ( ticket ) => {
    //     console.log('Desde el server', ticket );
    //     lblNuevoTicket.innerText = ticket;
    // });

});