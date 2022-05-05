const express = require('express');
const cors = require('cors');
const fileUpload =  require('express-fileupload');

const { dbConnection } = require('../database/config');

const { createServer } = require('http');
const { socketController } = require('../sockets/socketController');


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      products:   '/api/products',
      search:     '/api/search',
      users:      '/api/users',
      uploads:    '/api/uploads',
    }

    //Database Connection
    this.connectDB();

    //Middlewares
    this.middlewares();
    
    //App routes
    this.routes();

    //Sockets
    this.sockets();
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

    //File Upload - Carga de archivos
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes(){
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  };

  sockets(){
    this.io.on('connection', socketController);
  }

  listen(){
    this.server.listen(this.port, ()=>{
      console.log('Servidor escuchando el puerto', this.port );
    });
  }

}

module.exports = Server