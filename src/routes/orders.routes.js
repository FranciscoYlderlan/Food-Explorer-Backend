import Router from 'express';
import { OrdersController } from '../controllers/OrdersController.js';

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.get('/', ordersController.index);
ordersRoutes.get('/:id', ordersController.show);
ordersRoutes.post('/', ordersController.create);
ordersRoutes.patch('/', ordersController.update);
ordersRoutes.delete('/', ordersController.delete);

export { ordersRoutes };
