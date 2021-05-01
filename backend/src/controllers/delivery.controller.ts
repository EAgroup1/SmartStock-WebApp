import Delivery, { IDelivery } from '../models/delivery';
import { Request, Response } from 'express';


class deliveryCtrl { 

//CRUD

    //GETALL
    getAllDeliveries = async (_req: Request, res: Response) => {
        try {
            const deliveries: IDelivery[] = await Delivery.find()
            res.json(deliveries);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //POST CREATEONE
    createDelivery = async (req: Request, res: Response) => {
        console.log(req.body)
        try{
    //we create this object to not take delivery's id
            const newDelivery: IDelivery = new Delivery({
                lotItem: req.body.logItem,
                originLocation: req.body.originLocation,
                destinationLocation: req.body.destinationLocation,
                destinationItem: req.body.destinationItem,
                deliveryDate: req.body.deliveryDate,
                isPicked: req.body.isPicked,
                isDelivered: req.body.isDelivered,
                businessItem: req.body.businessItem,
                isAssigned: req.body.isAssigned,
                userItem: req.body.userItem
        });
            console.log(newDelivery);
            //this takes some time!
            await newDelivery.save();
            res.json({
                status: 'Delivery Saved Succesfully'
            });
            res.send({message: '¡Ya está creado el Delivery en el sistema!'})
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        } 
    }

    //DELETEONE
    deleteDelivery = async (req: Request, res: Response) => {

        console.log(req.params);
        
        try {
            await Delivery.findByIdAndDelete(req.params.id)
            res.json({
                status: 'Delivery eliminado correctamente'
            });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //PUT MODIFYONE
    updateDelivery = async (req: Request, res: Response) => {

        console.log(req.params);

        //we obtain id before we give it
        const { id } = req.params;
        //we want to modify this object with these parameters
        const modifiedDelivery: IDelivery = req.body;
        try {
            //if any parameter doesn't exist we create it
            await Delivery.findByIdAndUpdate(id, { $set: modifiedDelivery }, {new: true});
            res.json({
                status: 'Delivery actualizado correctamente'
            });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //GETONE
    getDelivery = async (req: Request, res: Response) => {
        console.log(req.params);
        try {
            const delivery = await Delivery.findById(req.params.id);
            res.json(delivery);
            res.send(delivery);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }
}

export default new deliveryCtrl();
