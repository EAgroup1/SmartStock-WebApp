const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { type:String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: { type:String, required: true},
    name: { type: String, required: false},
    lastname: { type: String, required: false},
    salary: { type: Number, required: false}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
module.exports = model('User', userSchema);