import mongoose, { Schema, model } from 'mongoose';
import User, { IUser } from './user';

export interface IMejora extends mongoose.Document {
    userItem?: IUser,
    mejora?: string,

}

const lotSchema = new Schema({
    userItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false},
    mejora: { type: String, required: false, default: ''},
})

//we will export our entity
export default model<IMejora>('Mejora', lotSchema);