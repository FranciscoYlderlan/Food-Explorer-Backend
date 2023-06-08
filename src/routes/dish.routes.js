import Router from 'express';
import { DishController } from '../controllers/DishController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const dishRoutes = Router();

const dishController = new DishController();

dishRoutes.use(ensureAuthentication);

dishRoutes.get('/', dishController.index);
dishRoutes.get('/:id', dishController.show);
dishRoutes.post('/', ensureUserIsAdmin, dishController.create);
dishRoutes.put('/:id', ensureUserIsAdmin, dishController.update);
dishRoutes.delete('/:id', ensureUserIsAdmin, dishController.delete);

export { dishRoutes };
