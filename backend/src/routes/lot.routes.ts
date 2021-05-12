import { Router } from 'express';
import lotCtrl from '../controllers/lot.controller';

const lotRouter: Router = Router();

//we put all routes in this file & we will se in the future
lotRouter.get('/', lotCtrl.getAllLots);
lotRouter.post('/', lotCtrl.createLot);
lotRouter.delete('/:id', lotCtrl.deleteLot);
lotRouter.put('/:id', lotCtrl.updateLot);
lotRouter.get('/:id', lotCtrl.getLot);
lotRouter.get('/:name', lotCtrl.getLotsWithSameName);

export default lotRouter;