require('dotenv').config();

const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer');
const Search = require('./models/search');

const main = async () =>{

  const search = new Search();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //show option to write
        const searchTerm = await readInput( 'Write city: ');
        //search places
        const places = await search.city( searchTerm );
        
        //select place in results
        const id = await listPlaces( places );
        if( id === '0') continue; 

        const selectedPlace = places.find( place => id === place.id);
        //save in DB
        search.addSearchHistory( selectedPlace.name );

        //search weather
        const weather = await search.placeWeather( selectedPlace.lat, selectedPlace.lng );
        
        //show weather results
        console.clear();
        console.log('\n City information \n');
        console.log('City:', selectedPlace.name.green);
        console.log('Lng:', selectedPlace.lng);
        console.log('Lat:', selectedPlace.lat);
        console.log('Temperature:', weather.temp);
        console.log('Min:', weather.min);
        console.log('Max:', weather.max);
        console.log('The weather is', weather.description);
        break;
      case 2:
        // search.capitalizedHistory.forEach()
        search.history.forEach( (place, i) =>{
          const idx = `${ i+1 }.`.green;
          console.log(`${ idx } ${ place }`);
        })
        break;
    }

    if ( opt !== 0 ) await pause();
  } while( opt !== 0 );


}

main();