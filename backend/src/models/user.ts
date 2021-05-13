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

//if this doesn't works, you comment the next function ;)
//we hash the user's password on this function
userSchema.pre<IUser>("save", function save(next) {
    var user = this;
    var SALT_FACTOR = 5;
  
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

//   //verificate sign-in (hash)
//   userSchema.methods.comparePassword = function(passw, cb) {
//     bcrypt.compare(passw, this.password, function(err, isMatch) {
//       if (err) {
//         return cb(err, false);
//       }
//       return cb(null, isMatch);
//     });
//   };

  userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

//we will export our entity
export default model<IUser>('User', userSchema);