import mongoose, { Schema, model } from 'mongoose';

export interface IDelivery extends mongoose.Document {
    lotItem: string,
    originLocation: string,
    destinationLocation: string,
    destinationItem: string,
    deliveryDate: string,
    isPicked: boolean,
    isDelivered: boolean,
    businessItem: string,
    isAssigned: boolean,
    userItem: string,
    description?: string
}

const deliverySchema = new Schema({
    lotItem: { type: String, required: true},
    originLocation: { type: String, required: true},
    destinationLocation: { type: String, required: true},
    destinationItem: { type: String, required: true},
    deliveryDate: { type: String, required: true},
    isPicked: { type: Boolean, required: true},
    isDelivered: { type: Boolean, required: true},
    businessItem: { type: String, required: true},
    isAssigned: { type: Boolean, required: true},
    userItem: { type: String, required: true},
    description: { type: String, required: false}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
export default model<IDelivery>('Delivery', deliverySchema);
