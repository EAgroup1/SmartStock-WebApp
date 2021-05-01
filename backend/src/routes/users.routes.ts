import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import usersCtrl from '../controllers/users.controller';

const router: Router = Router();


//we put all routes in this file & we will se in the future
router.get('/', usersCtrl.getAllUsers);
router.post('/', usersCtrl.createUser);
router.delete('/:id', usersCtrl.deleteUser);
router.put('/:id', usersCtrl.updateUser);
router.get('/:id', usersCtrl.getUser);

//auth routes ---> we research private routes
router.post('/logIn', usersCtrl.logIn);
//the signup route has a small difference with the createUser route
router.post('/signUp', usersCtrl.signUp);

//validated function to private routes --- verify token -/- express routing
//function verifyToken(req: Request, res: Response, next: NextFunction) {

    //console.log(req.headers.authorization);

    //if you don't have authorization field ---> you can't access to the route
    //if(!req.headers.authorization){
    //    return res.status(401).send('Unauthorized acces!');
    //}

    //exemple authorization header field = ['Bearer', 'token...']
    //const token = req.headers.authorization.split(' ')[1]
    //if(token == 'null'){
    //    return res.status(401).send('Unauthorized acces!');
    //}

    //we need the token of the user and your private key ---> checking...
    //const payload = jwt.verify(token, 'secretkey')
    //console.log(payload);

    //we save id of the payload on a property
    //req.userId = payload._id;
    //next();
//}

//private routes
// router.get('/admin/users', verifyToken, usersCtrl.getBackOffice);
// router.get('/user/profile', verifyToken, usersCtrl.getProfile);

//we will export
export default router;