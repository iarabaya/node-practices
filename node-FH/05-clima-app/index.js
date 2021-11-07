const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
require('colors');
const Search = require('./models/search');

const main = async () =>{

  const search = new Search();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //show option to write
        const place = await readInput( 'Write city: ');
        await search.city( place );
        //search places
        //select place in results
        console.log('\n City information \n');
        console.log('City: ');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperature:');
        console.log('Min:');
        console.log('Max:');
        //show weather results
        break;
      case 2:
        console.log('you chose option two');
        break;
      case 0:
        console.log('you chose option zero');
        break;
    }

    if ( opt !== 0 ) await pause();
  } while( opt !== 0 );


}

main();