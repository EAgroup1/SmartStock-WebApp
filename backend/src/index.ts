import database from './database';
//to commit
import app from './server';

app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
    console.log(`Using mongoDB version: ${database.version}`);
});


