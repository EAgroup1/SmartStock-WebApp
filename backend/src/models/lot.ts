import mongoose, { Schema, model } from 'mongoose';

export interface ILot extends mongoose.Document {
    name: string,
    dimensions: number,
    weight: number,
    qty: number,
    price: number,
    isFragile: boolean,
    info?: string,
    minimumQty: number,
    businessItem: string,
    userItem?: string
}

const lotSchema = new Schema({
    name: { type: String, required: true},
    dimensions: { type: Number, required: true},
    weight: { type: Number, required: true},
    qty: { type: Number, required: true},
    price: { type: Number, required: true},
    isFragile: { type: Boolean, required: true},
    info: { type: String},
    minimumQty: { type: Number, required: true},
    businessItem: { type: String, required: true},
    userItem: { type: String, default: ''}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
export default model<ILot>('Lot', lotSchema);