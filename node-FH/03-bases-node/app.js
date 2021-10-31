const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');


console.clear();

// console.log(argv);

createFile( argv.b , argv.l, argv.h )
  .then( fileName => console.log( fileName, 'created.'))
  .catch(err => console.log(err));



//sin yargs
// console.log(process.argv);
// const [, , arg3 ='base=5'] = process.argv;
// const [, base] = arg3.split('=');
