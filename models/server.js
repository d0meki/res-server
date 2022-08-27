const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        
        this.path ={ //mejor forma de hacer los path
            auth:'/api/auth',
            usuarios :'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos'
        }
        
        
 //       this.usuariosPath = '/api/usuarios'

        //Path agregado desde el Secmento 10 Api WEB Tocken
 //       this.authPath = '/api/auth'

        
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
        // this.app.use(this.authPath, require('../routes/auth'))
        // this.app.use(this.usuariosPath, require('../routes/usuarios'))        
        this.app.use(this.path.auth, require('../routes/auth'))
        this.app.use(this.path.usuarios, require('../routes/usuarios'))        
        this.app.use(this.path.categorias, require('../routes/categorias'))        
        this.app.use(this.path.productos, require('../routes/productos'))        
    }
    liste() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server