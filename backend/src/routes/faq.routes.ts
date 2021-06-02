import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import faqCtrl from '../controllers/faq.controller';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const faqRouter: Router = Router();

//we put all routes in this file & we will se in the future
faqRouter.get('/', faqCtrl.getAllFaq);
faqRouter.post('/', faqCtrl.createFaq);
faqRouter.delete('/:id', faqCtrl.deleteFaq);
faqRouter.put('/:id', faqCtrl.updateFaq);

//we export this router
export default faqRouter;
