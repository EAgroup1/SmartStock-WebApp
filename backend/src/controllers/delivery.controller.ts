import Delivery, { IDelivery } from '../models/delivery';
import { Request, Response } from 'express';
import User, { IUser } from '../models/user';



class deliveryCtrl { 
//CRUD
    //GETALL
    getAllDeliveries = async (_req: Request, res: Response) => {
        console.log("llega");

        console.log(_req.body);
        try {
            const deliveries: IDelivery[] = await Delivery.find()
            .populate({path:'lotItem', populate:{path:'userItem'}})
            .populate('destinationItem')
            .populate('businessItem')
            .populate('userItem');

            console.log(deliveries);
            res.json(deliveries);
            
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //GET NOT REDAY DELIVERIES USER
    getDeliveries = async(req: Request, res: Response)=> {
        console.log("no llega");
        const vacio = await User.findById(req.params.id)
            if(vacio === null){
                console.log(req.body);
                res.status(400).json({
                    code: 404,
                    status: 'Delivery no existe'
                });
            }
        try {
             const deliveries: IDelivery[] = await Delivery.find({"userItem":Object(req.params.id), "isReady":false})
            .populate({path:'lotItem', populate:{path:'userItem'}})
            .populate('destinationItem')
            .populate('businessItem')
            .populate('userItem');

            console.log(deliveries);
            res.json(deliveries);
            
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }
    getReadyDeliveries = async(req: Request, res: Response)=> {
        console.log(req.body);
        try {
             const deliveries: IDelivery[] = await Delivery.find({"userItem":Object(req.params.id), "isReady":true})
            .populate({path:'lotItem', populate:{path:'userItem'}})
            .populate('destinationItem')
            .populate('businessItem')
            .populate('userItem');

            console.log(deliveries);
            res.json(deliveries);
            
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    setReadyDelivery = async(req: Request, res: Response)=> {
        console.log(req.params.id);
        try {
            const vacio = await Delivery.findById(req.params.id);
            if(vacio === null){
                res.status(400).json({
                    code: 404,
                    status: 'Delivery no existe'
                });
            } else {
            await Delivery.findByIdAndUpdate(req.params.id, { $set: {"isReady":true}})
            res.status(200).json({

                status: 'Delivery actualizado correctamente'
            });
         }           
        } catch (err) {
            console.log(err);
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
                lots: "6091cfbc57de44327c1eb88f",
                lotItem: req.body.lotItem,
                originLocation: req.body.originLocation,
                destinationLocation: req.body.destinationLocation,
                destinationItem: req.body.destinationItem,
                deliveryDate: req.body.deliveryDate,
                isPicked: req.body.isPicked,
                isDelivered: req.body.isDelivered,
                isReady: req.body.isReady,
                businessItem: req.body.businessItem,
                isAssigned: req.body.isAssigned,
                userItem: req.body.userItem,
                description: req.body.description
        });
            console.log(newDelivery);
            //this takes some time!
            await newDelivery.save();
            res.status(200).json({
                status: 'Delivery Saved Succesfully'
            });
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
            const vacio = await Delivery.findByIdAndDelete(req.params.id)
            if(vacio === null){
                res.status(400).json({
                    code: 404,
                    status: 'Delivery no existe'
                });
            } else {
                res.status(200).json({
                    status: 'Delivery eliminado correctamente'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //PUT MODIFYONE
    updateDelivery = async (req: Request, res: Response) => {
        // For update the delivery params:
            //Location
            //Booleans
        console.log(req.params);

        //we obtain id before we give it
        const { id } = req.params;
        //we want to modify this object with these parameters
        const modifiedDelivery: IDelivery = req.body;
        try {
            //if any parameter doesn't exist we create it
            const vacio = await Delivery.findById(req.params.id);
            if(vacio === null){
                res.status(400).json({
                    code: 404,
                    status: 'Delivery no existe'
                });
            } else {
                await Delivery.findByIdAndUpdate(id, { $set: modifiedDelivery }, {new: true})
                res.status(200).json({
                    status: 'Delivery actualizado correctamente'
                });
            }
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
            const delivery = await Delivery.findById(req.params.id)
            .populate('lotItem')
            .populate('destinationItem',{'userName':1,'email':1,'location':1,'role':1})
            .populate('businessItem',{'userName':1,'email':1,'location':1,'role':1})
            .populate('userItem',{'userName':1,'email':1,'location':1,'role':1});
            res.json(delivery);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    
}

export default new deliveryCtrl();
