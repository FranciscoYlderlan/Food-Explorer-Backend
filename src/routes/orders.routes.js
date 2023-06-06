import Router from 'express';
import { OrdersController } from '../controllers/OrdersController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthentication);

ordersRoutes.get('/', ordersController.index);
ordersRoutes.get('/:id', ordersController.show);
ordersRoutes.post('/:user_id', ordersController.create);
ordersRoutes.patch('/', ordersController.update);
ordersRoutes.delete('/', ordersController.delete);

export { ordersRoutes };
