import mongoose, { Schema, model } from 'mongoose';
import Lot, {ILot} from './lot';
import User, {IUser} from './user';

export interface IDelivery extends mongoose.Document {
    lotItem: ILot,
    originLocation: string,
    destinationLocation?: string,
    destinationItem: IUser,
    deliveryDate: string,
    isPicked: boolean,
    isDelivered: boolean,
    isReady: boolean,
    businessItem: IUser,
    isAssigned: boolean,
    userItem?: IUser,
    description?: string
}

const deliverySchema = new Schema({
    lotItem: { type: mongoose.Schema.Types.ObjectId, ref: Lot, required: true},
    originLocation: { type: String, required: true},
    destinationLocation: { type: String, required: false},
    destinationItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    deliveryDate: { type: String, required: true},
    isPicked: { type: Boolean, required: true},
    isDelivered: { type: Boolean, required: true},
    isReady: { type: Boolean, required: true},
    businessItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
    isAssigned: { type: Boolean, required: true},
    userItem: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false, default: null},
    description: { type: String, required: false, default: ''}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
export default model<IDelivery>('Delivery', deliverySchema);
