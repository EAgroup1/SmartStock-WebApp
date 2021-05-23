//we require a model from models folder and the interface of this model
import User, { IUser } from '../models/user';
import { Request, Response } from 'express';
//we require the info of the jsonwebtoken module
import jwt from 'jsonwebtoken';

let usersWhats: {id: string; username: string;}[] =[]

class authCtrl {

     userJoin = async (req: Request, res: Response) => {
         // te llega 
        console.log(req.params);
        try {
            const user = await User.findById(req.params.id);
            if (user === null) {
                res.status(400).json({
                    code: 404,
                    status: 'User no existe'
                });

            } else {
                res.json(user);
            }
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    userLeave = async (_req: Request, res: Response) => {
        try {
            const users: IUser[] = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

}

export default new authCtrl();
