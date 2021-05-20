//this file contains all info about express ---> similarities with app
import morgan from 'morgan'; //logger
import express from 'express';
import cors from 'cors';
import router from './routes';

//researching new libraries ---> available very soon...
import cookieParser from 'cookie-parser';

//other libraries to reset password
import session from 'express-session';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'

//we call swagger imports
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

// Inicializaciones
const app = express();

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

//other uses ---> if this doesn't works, you comment the next two lines
//we implement cookies to know the req's go to the same navigator
app.use(cookieParser());
app.use(session({ secret: 'session secret key'}));

// Rutas
app.use("/api", router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//we export our app
export default app;