//this file contains all info about express ---> similarities with app
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import router from './routes';

//require all imports to deploy WebSockets
import http from 'http';
const { Server } = require("socket.io");
import { Message } from './models';
import path from 'path';
// import User, {IUser} from './models/user';

import passport from 'passport';
import passportMiddleware from './middlewares/passport'

//we call swagger imports
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

// Inicializaciones
const app = express();

// Configuración
//we use the port 8000 for Flutter ---> important from Eric!
app.use(cors({origin: 'http://eetacea0.upc.es'}));

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
