//this is the file that it starts my app
import database from './database';

//to commit
import app from './server';

app.listen(app.get('port'), () => {
    //Express Application
    console.log(`Server on port: ${app.get('port')}`);
    //Database connection
    console.log(`Using mongoDB version: ${database.version}`);
});