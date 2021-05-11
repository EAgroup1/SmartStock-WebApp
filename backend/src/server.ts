import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import router from './routes';

//Bcrypt ---> researching...
//also we research in the swagger for endpoints o

// Inicializaciones
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
app.use(cors({origin: 'http://localhost:8000'}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api", router);

export default app;