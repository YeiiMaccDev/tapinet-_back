const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        // Paths de la API
        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads',
            securityQuestions: '/api/security-questions', // Nuevo módulo para preguntas de seguridad
            userSecurityAnswers: '/api/user-security-answers', // Nuevo módulo para respuestas de seguridad de usuario
            locations: '/api/locations', // Ruta para el módulo de Localidad
            activities: '/api/activities',        // Ruta para Actividades
            parks: '/api/parks',        // Ruta para Parques
            contacts: '/api/contacts', // Módulo de Contactos
            ratings: '/api/ratings', // Módulo de Comentarios/Calificaciones
            timeConnections: '/api/time-connections', // Módulo de Tiempos de Conexión
        }

        // Conectar a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/upload'));
        this.app.use(this.paths.securityQuestions, require('../routes/securityQuestion')); // Ruta de SecurityQuestions
        this.app.use(this.paths.userSecurityAnswers, require('../routes/userSecurityAnswer')); // Ruta de UserSecurityAnswers
        this.app.use(this.paths.locations, require('../routes/location')); // Ruta de Localidad
        this.app.use(this.paths.activities, require('../routes/activity')); // Ruta de Actividades
        this.app.use(this.paths.parks, require('../routes/park')); // Ruta de parques
        this.app.use(this.paths.contacts, require('../routes/contact')); // Ruta de Contactos
        this.app.use(this.paths.ratings, require('../routes/rating')); // Ruta de Comentarios/Calificaciones
        this.app.use(this.paths.timeConnections, require('../routes/TimeConnection')); // Ruta de Tiempos de Conexión
    }

       listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;
