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

    //get the id of the user & join in a room (one-to-one)
    //if string generates problems ---> we delete 'string'
    const id = socket.handshake.query.id;
    socket.join(id);

    //user disconnects to the system
    socket.on('disconnect', () => {
        socket.leave(id);
    });

    //send message to particular user
    socket.on('send_message', (message:any) => {
        const receiverChatID = message.receiverChatID;
        const senderChatID = message.senderChatID;
        const content = message.content;

        //send message to particular room
        socket.in(receiverChatID).emit('receive_message', {
            'content': content,
            'senderChatID': senderChatID,
            'receiverChatID': receiverChatID,
        });
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
app.use(cors({origin: '*'}));

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