const { Schema, model } = require('mongoose')

const lotSchema = new Schema({
    name: { type: String, required: true},
    dimensions: { type: String, required: true},
    weight: { type: String, required: true},
    qty: { type: String, required: false},
    price: { type: String, required: true},
    isFragile: { type: boolean, required: true},
    info: { type: String, required: false},
    minimumQty: { type: String, required: false},
    businessItem: { type: String, required: true},
    userItem: { type: String, required: true}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
module.exports = model('Lot', lotSchema);