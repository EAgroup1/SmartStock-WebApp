//this is the file that it starts my app

//to commit
//file that it starts my app
import dotenv from 'dotenv';
dotenv.config();

import app from './server';
import database from './database';
var server = require('http').Server(app);
const options= {   
    transports: ["websocket"],
       cors: {     origin: "*",
            methods: ["GET", "POST"]} };


let io = require('socket.io')(server,options);


//const io = new Server(server);

io.on('connection', (socket: any) => {
    console.log("Socket listening with id: "+socket.id);
    socket.emit('MyReceiverSocket',socket.id);
    socket.on('escribiendo',(data: any) =>{
        console.log("Listening chat with id: "+socket.id);
        //socket.in(data).emit('escribiendo',data);
        socket.to(data).emit('escribiendo',socket.id);
        //socket.id;
    });
    socket.on('newmsg',(data: any) =>{
        console.log("New message from "+socket.id);
        console.log(data);
        socket.to(data.socket).emit('newmsg', data);
    });
    socket.on('disconnect', (data: any) => {
        socket.to(data).disconnect();
        console.log("Disconnected chat with id: "+socket.id);
    });
});


//CONNECTS SOCKET
var server_port = process.env.PORT || 3000;
//we obviate the error
server.listen(server_port, () => {
    console.log('listening on http://localhost:' + server_port);
});


//CONNECTS MONGODB
app.listen(app.get('port'), () => {
    //Express Application
    console.log(`Server on port: ${app.get('port')}`);
    //Database connection
    console.log(`Using mongoDB version: ${database.version}`);
});
