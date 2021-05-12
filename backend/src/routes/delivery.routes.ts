import { Router } from 'express';
import deliveryCtrl from '../controllers/delivery.controller';

const deliveryRouter: Router = Router();

//we put all routes in this file & we will se in the future
deliveryRouter.get('/', deliveryCtrl.getAllDeliveries);
deliveryRouter.post('/', deliveryCtrl.createDelivery);
deliveryRouter.delete('/:id', deliveryCtrl.deleteDelivery);
deliveryRouter.put('/:id', deliveryCtrl.updateDelivery);
deliveryRouter.get('/:id', deliveryCtrl.getDelivery);
deliveryRouter.get('/deliveries/:id', deliveryCtrl.getDeliveries);


export default deliveryRouter;