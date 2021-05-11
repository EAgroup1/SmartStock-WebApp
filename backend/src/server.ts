//this file contains all info about express ---> similarities with app
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import router from './routes';

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
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api", router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//we export our app
export default app;