const lotCtrl = {}

const Lot = require('../models/Lot')

//CRUD
lotCtrl.getAllLots = async (req, res) => {

    const losts = await Lot.find()
    res.json(losts)
}

lotCtrl.createLot = async (req, res) => {

    console.log(req.body)

    //we create this object to not take lot's id
    const newLot = new Lot({
        name: req.body.name,
        dimensions: req.body.dimensions,
        weight: req.body.weight,
        price: req.body.price,
        isFragile: req.body.isFragile,
        businessItem: req.body.businessItem,
        userItem: req.body.userItem
    });

    console.log(newLot);

    //this takes some time!
    await newLot.save()
    res.send({message: '¡Ya está creado el Lot en el sistema!'})
}

lotCtrl.deleteLot = async (req, res) => {
    
    console.log(req.params)

    await Lot.findByIdAndDelete(req.params.id)

    res.json({status: 'Lot eliminado correctamente'})
}

lotCtrl.updateLot = async (req, res) => {

    console.log(req.params)

    //we obtain id before we give it
    const { id } = req.params;

    //we want to modify this object with these parameters
    const modifiedLot = {
        name: req.body.name,
        dimensions: req.body.dimensions,
        weight: req.body.weight,
        price: req.body.price,
        isFragile: req.body.isFragile,
        businessItem: req.body.businessItem,
        userItem: req.body.userItem
    }

    //if any parameter doesn't exist we create it
    await Lot.findByIdAndUpdate(id,{$set: modifiedLot}, {new: true})

    res.json({status: 'Lot actualizado correctamente'})
}

lotCtrl.getLot = async (req, res) => {

    console.log(req.params)

    const lot = await Lot.findById(req.params.id)

    res.send(lot)
}

module.exports = lotCtrl;