const { Router } = require('express') 

const router = Router()

const usersCtrl = require('../controllers/users.controller.js')

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

//we will export
module.exports = router;