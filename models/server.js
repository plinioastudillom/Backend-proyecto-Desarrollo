const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
       
        this.paths = {
            auth: '/api/auth',
            teacher: '/api/teacher',
            user: '/api/usuarios',
            uploads: '/api/uploads',
            student: '/api/students',
            documentType: '/api/documentType',
            studentDocuments: '/api/studentDocuments'
        }
        //Conect to DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    
    }

    async conectarDB(){
        await dbConnection();
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.user, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        this.app.use( this.paths.student, require('../routes/student'));
        this.app.use( this.paths.teacher, require('../routes/teacher'));
        this.app.use( this.paths.documentType, require('../routes/documentType'));
        this.app.use( this.paths.studentDocuments, require('../routes/studentDocument'));
    }

   

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });

        
    }



}




module.exports = Server;
