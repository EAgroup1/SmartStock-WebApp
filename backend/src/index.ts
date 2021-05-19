//file that it starts my app
import dotenv from 'dotenv';
dotenv.config();

import app from './server';
import database from './database';

app.listen(app.get('port'), () => {
    //Express Application
    console.log(`Server on port: ${app.get('port')}`);
    //Database connection
    console.log(`Using mongoDB version: ${database.version}`);
});