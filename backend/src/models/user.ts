import mongoose, { Schema, model } from 'mongoose';
//the password cannot store in plaintext on database
import bcrypt from 'bcrypt-nodejs';

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
    avatar?: string,
    resetPasswordToken?: string,
    resetPasswordExpires?: Date,
    passwordConfirmation: String,
    comparePassword(candidatePassword: string): Promise<boolean>;
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
    avatar: { type: String, required: false},
    //reset pass--->
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false
});

//if this doesn't works, you comment the next function
//we hash the user's password on this function

//userSchema.pre<IUser>("save", function save(next) {
userSchema.pre<IUser>('save', function(next) {
    var user = this;
    //a salt factor of 10 is very secure 
    var SALT_FACTOR = 10;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//we will export our entity
export default model<IUser>('User', userSchema);