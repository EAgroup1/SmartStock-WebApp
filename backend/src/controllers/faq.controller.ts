//we require a model from models folder and the interface of this model
import User, { IUser } from '../models/user';
import Faq, { IFaq } from '../models/faq';
import { Request, Response } from 'express';
//we require the info of the jsonwebtoken module


class faqCtrl {

    //our User's CRUD

    //GET ALL FAQS
    getAllFaq = async (_req: Request, res: Response) => {
        try {
            const faqs: IFaq[] = await Faq.find();
            res.json(faqs);
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //POST FAQ
    createFaq = async (req: Request, res: Response) => {

        console.log(req.body);

        try {
            //we create this object to not take user's id
            const newFaq: IFaq = new Faq({
                title: req.body.userName,
                body: req.body.email,
                type: req.body.password
            });

            console.log(newFaq);
            //this takes some time!
            await newFaq.save();
            res.json({
                status: 'Faq Created Succesfully'
            });
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //DELETE FAQ
    deleteFaq = async (req: Request, res: Response) => {
        console.log(req.params);
        try {
            const vacio = await Faq.findByIdAndDelete(req.params.id);
            console.log(vacio);
            if (vacio === null) {
                res.status(400).json({
                    code: 404,
                    status: 'No existe el id de faq.'
                });
            } else {
                res.status(200).json({
                    status: 'FAQ eliminado correctamente'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

    //UPDATE USER
    updateFaq = async (req: Request, res: Response) => {

        console.log(req.params);

        //we obtain id before we give it
        const { id } = req.params;
        //we want to modify this object with these parameters
        const modifiedFaq: IFaq = req.body;
        try {
            //if any parameter doesn't exist we create it
            const vacio = await Faq.findById(req.params.id);
            if (vacio === null) {
                res.status(400).json({
                    code: 404,
                    status: 'El id de faq no existe'
                });
            } else {
                await User.findByIdAndUpdate(id, { $set: modifiedFaq }, { new: true })
                res.status(200).json({
                    status: 'FAQ actualizado correctamente'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: `${err.message}`
            });
        }
    }

}

export default new faqCtrl();
