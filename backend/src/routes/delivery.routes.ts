import { Router } from 'express';
import deliveryController from '../controllers/delivery.controller';
import deliveryCtrl from '../controllers/delivery.controller';

const deliveryRouter: Router = Router();

//we put all routes in this file & we will se in the future
deliveryRouter.get('/', deliveryCtrl.getAllDeliveries);
deliveryRouter.post('/', deliveryCtrl.createDelivery);
deliveryRouter.delete('/:id', deliveryCtrl.deleteDelivery);
deliveryRouter.put('/:id', deliveryCtrl.updateDelivery);
deliveryRouter.get('/:id', deliveryCtrl.getDelivery);
deliveryRouter.post('/:id/deliveries', deliveryCtrl.getDeliveries);
deliveryRouter.post('/:id/readydeliveries', deliveryCtrl.getReadyDeliveries);
deliveryRouter.post('/readydelivery', deliveryCtrl.setReadyDelivery);

export default deliveryRouter;