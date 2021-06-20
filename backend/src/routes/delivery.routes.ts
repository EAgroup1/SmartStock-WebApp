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

deliveryRouter.get('/:id/deliveries', deliveryCtrl.getDeliveries);
deliveryRouter.get('/:id/readydeliveries', deliveryCtrl.getReadyDeliveries);
deliveryRouter.put('/readydelivery/:id', deliveryCtrl.setReadyDelivery);

deliveryRouter.get('/deliverer/notAssigned', deliveryCtrl.getNotAssigned);

deliveryRouter.get('/:id/isAssigned', deliveryCtrl.getAssigned);
deliveryRouter.put('/assigned/:id', deliveryCtrl.setAssigned);
deliveryRouter.get('/getDeliveriesByChart/:id', deliveryCtrl.getDeliveriesByChart);

export default deliveryRouter;