import mongoose, { Schema, model } from 'mongoose';

export interface IUser extends mongoose.Document {
    userName: string,
    email: string,
    password: string,
    role?: string,
    bank?: string,
    signUpWithGoogle?: boolean,
    signUpWithFacebook?: boolean,
    location?: string,
    balance?: number
}

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true},
    email: { type: String, lowercase: true, trim: true, unique: true, required: true},
    password: { type: String, required: true},
    role: { type: String, default: ''},
    bank: { type: String, default: ''},
    signUpWithGoogle: { type: Boolean, default: false},
    signUpWithFacebook: { type: Boolean, default: false},
    location: { type: String},
    balance: { type: Number}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false
});

//we will export our entity
export default model<IUser>('User', userSchema);