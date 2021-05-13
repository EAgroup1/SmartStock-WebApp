//this file contains all info about express ---> similarities with app
import morgan from 'morgan'; //logger
import express from 'express';
import cors from 'cors';
import router from './routes';

//researching new libraries ---> available very soon...
import path from 'path';
import favicon from 'serve-favicon';
//import bodyParser from 'body-parser'; tis libray is replaced by express
import cookieParser from 'cookie-parser';

//other libraries to reset password
import session from 'express-session';
import nodemailer from 'nodemailer';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import async from 'async';
import crypto from 'crypto';

//we call swagger imports
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

// Inicializaciones
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
//we use the port 8000 for Flutter ---> important from Eric!
app.use(cors({origin: 'http://localhost:8000'}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
//we don't need json to send data ---> a variant
app.use(express.urlencoded({ extended: false }));

//other uses ---> if this doesn't works, you comment the next two lines ;)
app.use(cookieParser());
app.use(session({ secret: 'session secret key'}));


// Rutas
app.use("/api", router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//we export our app
export default app;