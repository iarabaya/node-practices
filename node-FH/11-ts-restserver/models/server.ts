import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';

import database from '../database/connection';

class Server {

  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users'
  }

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '8000';
  
    //initial methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  
  }

  async dbConnection(){
    try {

      await database.authenticate();
      console.log('Database is online');
      
    } catch (error: any) {
      throw new Error( error );
       
    }
  }

  middlewares(){
    //CORS
    this.app.use( cors() );

    //parse body
    this.app.use( express.json() );

    //public folder
    this.app.use( express.static('public') );
  }

  routes(){
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen(){
    this.app.listen( this.port, () => {
      console.log(`server running on port ${ this.port }`);
    })
  }


}

export default Server;