const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //conectar a base de datos
        this.conectarDB()

        //Middleware
        this.middlewares()

        //rutas de mi aplicacion
        this.routes()
    }
    middlewares() {
        //CORS
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //DIRECTORIO PUBLIC
        this.app.use(express.static('public'))
    }
    async conectarDB() {
        await dbConnection()
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    liste() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server