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
    balance?: number,
    avatar?: string
}

const userSchema = new Schema({
    userName: { type: String,required: true,  unique: true},
    email: { type: String, required: true, lowercase: true, trim: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: false},
    bank: { type: String, required: false},
    signUpWithGoogle: { type: Boolean, required: false, default: false},
    signUpWithFacebook: { type: Boolean, required: false, default: false},
    location: { type: String, required: false},
    balance: { type: Number, required: false, default: '0'},
    //Guys we need a picture for the user! ---> location avatar
    avatar: { type: String, required: false}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false
});

//we will export our entity
export default model<IUser>('User', userSchema);
