import User, { IUser } from '../models/user';
import { Message } from '../models/message';

export class ChatMessage extends Message{
    constructor(from: IUser, content: string){
        super(from, content);
    }
}