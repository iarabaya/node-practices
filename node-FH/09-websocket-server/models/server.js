const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {        
        // this.app.use( this.paths.auth, require('../routes/auth'));   
    }

    sockets(){
        this.io.on('connection', socket =>{
            console.log('client connected', socket.id);

            socket.on('disconnect', () => {
                console.log('disconected client', socket.id);
            })

            socket.on('send-msg', (payload) => {
                console.log('mensaje recibido desde el server ', payload);
            })
        })
    }

    listen() {
        //this.server instead of this.app
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;