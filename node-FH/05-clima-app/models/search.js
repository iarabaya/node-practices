const axios = require('axios');

class Search {
  history = [ 'Buenos Aires', 'La Plata', 'Bogotá'];


  constructor(){
    //TODO:  read db if exists

  }

  async city( place = '' ){
    try {
      //http request
      // console.log('City:', place);
      const response = await axios.get('https://reqres.in/api/users?page=2');
      console.log(response.data);      

      return []; //return cities that match the place
    } catch (error) {
      return [];
    }
  }
}

module.exports = Search;