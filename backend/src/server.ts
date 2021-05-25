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

io.on('connection', (socket: any) => {

    console.log('user connect...', socket.id);

    //prove --- after prove this function we deleted
    socket.on('send_message', (data: any) => {
        socket.broadcast.emit('receiver_message', data);
    });

    //user is typing
    socket.on('typing', (m: Message) => {
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('typing', m);
    });

    //user send a message
    socket.on('message', (m: Message) =>{
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
    });

    //user sends the location
    socket.on('location', (m: Message) =>{
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('location', m);
    });

    //user connects to the system
    socket.on('connect', () => {});

    //user disconnects to the system
    socket.on('disconnect', () => {
        console.log('user disconnect...', socket.id);
    });

    //user has an error
    socket.on('error', (err: any) => {
        console.log('received error from user:', socket.id);
        console.log(err);
    });
});

//port for sockets
var server_port = process.env.PORT || 3000;

//we obviate the error
server.listen(server_port, () => {
    console.log('listening on http://localhost:' + server_port);
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