require('colors');

const { showMenu , pause } = require('./helpers/messages');

console.clear();
const main = async() => {
  console.log('Hola mundo');

  let opt = '';

  do {
    
   opt = await showMenu();
   console.log({opt});
   if( opt !== '0') await pause();

  } while( opt !== '0' );

  // pause();
}

main();