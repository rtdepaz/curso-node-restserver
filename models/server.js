const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/usuarios'

        // middlewares
        this.middlewares();

        // rutas de mi aplicación
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use( express.json() );

        // directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto:", this.port);
        });
    }

}

module.exports = Server;
