const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';

    //Database Connection
    this.connectDB();

    //Middlewares
    this.middlewares();
    
    //Rutas de la app
    this.routes();
  }

  async connectDB(){
    await dbConnection();
  }

  middlewares(){
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use( express.static('public'));
  }

  routes(){
    this.app.use(this.usersPath, require('../routes/users'));
  };

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor escuchando el puerto', this.port );
    });
  }

}

module.exports = Server