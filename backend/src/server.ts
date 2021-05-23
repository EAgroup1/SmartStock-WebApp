//this file contains all info about express ---> similarities with app
import morgan from 'morgan'; //logger
import express from 'express';
import cors from 'cors';
import router from './routes';

//require all imports to deploy WebSockets
import http from 'http';
const { Server } = require("socket.io");
import { Message } from './models';
// import User, {IUser} from './models/user';

import passport from 'passport';
import passportMiddleware from './middlewares/passport'

//we call swagger imports
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

// Inicializaciones
const app = express();

//initialize sockets
const server = http.createServer(app);
const io = new Server(server);

//port for sockets
var port = 3001;

io.on('connection', (socket: any) => {

    //disconnect of the system
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //send a broadcast message
    console.log('a user connected on port %s', port);
    socket.on('send-message', (m: Message) =>{
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
    });
});

server.listen(port, () => {
    console.log('listening in http://localhost:' + port);
});

// Configuración
app.set('port', process.env.PORT || 4000);
//we use the port 8000 for Flutter ---> important from Eric!
app.use(cors({origin: 'http://localhost:8000'}));

// Middlewares ---> functions that process data before routes
app.use(morgan('dev'));
app.use(express.json());
//we don't need json to send data ---> a variant
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

// Rutas
app.use("/api", router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//we export our app
export default app;