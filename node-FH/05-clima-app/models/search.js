const fs = require('fs');
const axios = require('axios');

class Search {
  history = [];
  dbPath = './db/database.json';


  constructor(){
    this.readDB();
  }

  get capitalizedHistory(){
    return this.history.forEach( e => e.toUpperCase() );
  }

  get paramsMapbox(){
    return {
      'access_token': process.env.MAPBOX_KEY ,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsOpenWeather(){
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      // 'lang': 'es'
    }
  }

  async city( place = '' ){
    try {
      //http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
        params: this.paramsMapbox
      });

      const response = await instance.get(); 
      // const response = await axios.get('https://reqres.in/api/users?page=2');

     //return cities that match the place
     return response.data.features.map( item => ({
       id: item.id,
       name: item.place_name,
       lng: item.center[0],
       lat: item.center[1]

     }))
    } catch (error) {
      return [];
    }
  }


  async placeWeather( lat, lon ){
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}`,
        params: this.paramsOpenWeather
      });

      const res = await instance.get();
      const { weather, main } = res.data;

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }

    } catch (error) {
      console.log(error);
    }
  }


  addSearchHistory( place = '' ){
    //TODO avoid duplicates
    if ( this.history.includes( place.toLocaleLowerCase() ))

    this.history.unshift( place.toLocaleLowerCase() );

    //save in DB
    this.saveDB();
  }

  saveDB(){
    const payload = {
      history: this.history,
    }

    fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
  }

  readDB(){
    //must exist

    //const info .... readfilesync...path ...{encoding:utf-8}
    const data = JSON.stringify( info );

    this.history = history

  }
}

module.exports = Search;