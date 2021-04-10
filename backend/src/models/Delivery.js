const { Schema, model } = require('mongoose')

const deliverySchema = new Schema({
    lotItem: { type: String, required: true},
    originLocation: { type: String, required: true},
    destinationLocation: { type: String, required: true},
    destinationItem: { type: String, required: true},
    deliveryDate: { type: String, required: true},
    isPicked: { type: boolean, required: true},
    isDelivered: { type: boolean, required: true},
    businessItem: { type: String, required: true},
    isAssigned: { type: boolean, required: true},
    userItem: { type: String, required: true},
    description: { type: String, required: false}
}, {
    //timestamps adds createDate and updateDate of the object
    timestamps: true,
    versionKey: false

})

//we will export our entity
module.exports = model('Delivery', deliverySchema);