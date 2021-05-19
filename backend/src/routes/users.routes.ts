import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import usersCtrl from '../controllers/users.controller';
import jwt from 'jsonwebtoken';

//some tests
import {TokenValidation} from '../libs/checkToken';

const usersRouter: Router = Router();

//we put all routes in this file & we will se in the future
usersRouter.get('/', usersCtrl.getAllUsers);
usersRouter.post('/', usersCtrl.createUser);
usersRouter.delete('/:id', usersCtrl.deleteUser);
usersRouter.put('/:id', usersCtrl.updateUser);
usersRouter.get('/:id', usersCtrl.getUser);

//auth routes ---> we research private routes
usersRouter.post('/logIn', usersCtrl.logIn);
//the signup route has a small difference with the createUser route
usersRouter.post('/signUp', usersCtrl.signUp);

//validated function to private routes --- verify token -/- express routing
function verifyToken(req: Request, res: Response, next: NextFunction) {

    console.log(req.headers.authorization);

    // if you don't have authorization field ---> you can't access to the route
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized acces!');
    }

    // exemple authorization header field = ['Bearer', 'token...']
    const token = req.headers.authorization.split(' ')[1]
    if(token == 'null'){
        return res.status(401).send('Unauthorized acces!');
    }

    // we need the token of the user and your private key ---> checking...
    const payload = jwt.verify(token, 'secretkey')
    console.log(payload);

    // we save id of the payload on a property

    //LA LINEA DE ABAJO NO ESTA BIENNNNNNN!!!
    req.body._id = payload;
    next();
}

//some tests about private routes (only if you have a token)
usersRouter.get('/privateRoute', TokenValidation, usersCtrl.privateRoute);

//we export this router
export default usersRouter;