//we require a model from models folder and the interface of this model
import User, { IUser } from '../models/user';
import { Request, Response } from 'express';

//we require the info of the jsonwebtoken module
import jwt from 'jsonwebtoken';

class userCtrl {

//our User's CRUD

    //GETALL
    getAllUsers = async (_req: Request, res: Response) => {
        try {
            const users: IUser[] = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //POST CREATEONE
    createUser = async (req: Request, res: Response) => {

        console.log(req.body);

        try {
        //we create this object to not take user's id
            const newUser: IUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            });
            console.log(newUser);
            //this takes some time!
            await newUser.save();
            res.json({
                status: 'User Saved Succesfully'
            });
            res.send({message: '¡Ya estás registrado en el sistema!'})
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
    
        console.log(req.params);
        try {
        await User.findByIdAndDelete(req.params.id);
        res.json({
            status: 'Usuario eliminado correctamente'
        });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    updateUser = async (req: Request, res: Response) => {

        console.log(req.params);

        //we obtain id before we give it
        const { id } = req.params;
        //we want to modify this object with these parameters
        const modifiedUser: IUser = req.body;
        try {
        //if any parameter doesn't exist we create it
        await User.findByIdAndUpdate(id, { $set: modifiedUser }, { new: true })
        res.json({
            status: 'Usuario actualizado correctamente'
        });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    getUser = async (req: Request, res: Response) => {

        console.log(req.params);
        try {
        const user = await User.findById(req.params.id);
        res.json(user);
        res.send(user);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    logIn = async (req: Request, res: Response) => {

        console.log(req.body);
        const { email, password } = req.body;

        //search the params ({email: email}) ---> next steps encrypt again
        try {
        //we wait to the search in database (async-await)
        const user = await User.findOne({email});
        if(!user) return res.status(401).send("This email doesn't exist!");
        //& password validator
        else if(user.password !== password) return res.status(401).send("Incorrect password!");
        const token = jwt.sign({_id: user._id}, 'secretkey');
        const _aux = {
            _id:user._id,
            token:token
        }
        res.status(200).json(_aux);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    signUp = async (req: Request, res: Response) => {

        //we see the body of the user's request
        console.log(req.body);

        //we extract the info of the json object
        const { email, userName, password} = req.body;

        //in the next steps, we encrypt these params
        try {
        const newSignUpUser: IUser = new User({email, userName, password});
        await newSignUpUser.save();
    
        //then, we create a token (payload, variable & options)
        const token = jwt.sign({_id: newSignUpUser._id}, 'secretkey');

        //we return the json object with the created token to the user & status = OK
        res.status(200).json({token})
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    getBackOffice = async (req: Request, res: Response)=>{
        res.status(200).send('All OK!');
    }

    getProfile = async (req: Request, res: Response)=>{
        res.status(200).send('All OK!');
    }
}

export default new userCtrl();