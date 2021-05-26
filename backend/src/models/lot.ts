import mongoose, { Schema, model } from 'mongoose';
import User, {IUser} from './user';
export interface ILot extends mongoose.Document {
    name: string,
    dimensions: string,
    weight: number,
    qty: number,
    price: number,
    isFragile: boolean,
    info?: string,
    minimumQty: number,
    businessItem: IUser,
    userItem?: IUser
}


const lotSchema = new Schema({
    name: { type: String, required: true},
    dimensions: { type: String, required: true},
    weight: { type: Number, required: true},
    qty: { type: Number, required: true},
    price: { type: Number, required: true},
    isFragile: { type: Boolean, required: true},
    info: { type: String, required: false, default: ''},
    minimumQty: { type: Number, required: true},
    businessItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    userItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
export default model<ILot>('Lot', lotSchema);