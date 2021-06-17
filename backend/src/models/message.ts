import User, { IUser } from './user';

//due it's a very small class we didn't create any interface
export class Message{
    constructor(private from: IUser, private content: string){}
}