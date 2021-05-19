import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

//interface for payload (all content about the token)
interface IPayload{
    _id: string,
    iat: number;
    exp: number;
}

//middleware
export const TokenValidation = (req: Request, res: Response , next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Acces denied!');

    //verify the token!
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'tokentest') as IPayload;
    //req.userId = payload;
    next();
}