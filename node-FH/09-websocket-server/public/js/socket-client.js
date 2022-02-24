console.log('hello world');
//Referencias al HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
  console.log('conectado');
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
})

socket.on('disconnect', () => {
  console.log('desconectado');
  lblOffline.style.display = '';
  lblOnline.style.display = 'none';
})

btnSend.addEventListener( 'click', () => {
  const msg = txtMsg.value;
  const payload = {
    msg,
    id: 'asdas123',
    date: new Date().getTime()
  }

  socket.emit('send-msg', payload );
})