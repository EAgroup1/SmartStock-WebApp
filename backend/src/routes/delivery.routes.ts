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
//marie te he modificado las dos siguientes rutas porque estaban como deliveryRouter.post - ya me dirás
deliveryRouter.get('/:id/deliveries', deliveryCtrl.getDeliveries);
deliveryRouter.get('/:id/readydeliveries', deliveryCtrl.getReadyDeliveries);
//la siguiente también la he retocado era un post y ahora es un put
deliveryRouter.put('/readydelivery/:id', deliveryCtrl.setReadyDelivery);

export default deliveryRouter;