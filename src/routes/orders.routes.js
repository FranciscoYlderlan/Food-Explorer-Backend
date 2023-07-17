import Router from 'express';
import { OrdersController } from '../controllers/OrdersController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthentication);

ordersRoutes.get('/', ensureUserIsAdmin, ordersController.index);
ordersRoutes.get('/', ordersController.show);
ordersRoutes.post('/', ordersController.create);
ordersRoutes.patch('/', ensureUserIsAdmin, ordersController.update);
ordersRoutes.delete('/', ensureUserIsAdmin, ordersController.delete);

export { ordersRoutes };
