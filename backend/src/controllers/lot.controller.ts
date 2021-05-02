import Lot, { ILot } from '../models/lot';
import { Request, Response } from 'express';

class lotCtrl {
//CRUD

    getAllLots = async (_req: Request, res: Response) => {
        try {
            const losts: ILot[] = await Lot.find();
            res.json(losts);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    createLot = async (req: Request, res: Response) => {

        console.log(req.body);
        try {
        //we create this object to not take lot's id
        const newLot: ILot = new Lot({
            name: req.body.name,
            dimensions: req.body.dimensions,
            weight: req.body.weight,
            qty: req.body.qty,
            price: req.body.price,
            isFragile: req.body.isFragile,
            minimumQty: req.body.minimumQty,
            businessItem: req.body.businessItem
            });
            console.log(newLot);

            //this takes some time!
            await newLot.save();
                res.json({
                    status: 'Lot Saved Succesfully'
                });
            res.send({message: '¡Ya está creado el Lot en el sistema!'});
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    deleteLot = async (req: Request, res: Response) => {
    
        console.log(req.params);
        try {
            await Lot.findByIdAndDelete(req.params.id);
            res.json({
                status: 'Lot eliminado correctamente'
            });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    updateLot = async (req: Request, res: Response) => {

        console.log(req.params)
        //we obtain id before we give it
        const { id } = req.params;
        //we want to modify this object with these parameters
        const modifiedLot: ILot = req.body;
        try {
        //if any parameter doesn't exist we create it
        await Lot.findByIdAndUpdate(id, { $set: modifiedLot }, {new: true})
        res.json({
            status: 'Lot actualizado correctamente'
        });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    getLot = async (req: Request, res: Response) => {
        console.log(req.params);
        try {
        const lot = await Lot.findById(req.params.id);
        res.send(lot);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }
}

export default new lotCtrl();