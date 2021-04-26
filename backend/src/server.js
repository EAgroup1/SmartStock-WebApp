console.log("hello world");

//Bcrypt ---> researching...
//also we research in the swagger for endpoints o

const morgan = require('morgan');

const express = require('express');

const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require('./routes/users.routes'))

module.exports = app;