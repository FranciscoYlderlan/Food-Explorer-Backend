import Router from 'express';
import { DishController } from '../controllers/DishController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const dishRoutes = Router();

const dishController = new DishController();

dishRoutes.use(ensureAuthentication);

dishRoutes.get('/', dishController.index);
dishRoutes.get('/:id', dishController.show);
dishRoutes.post('/', dishController.create);
dishRoutes.put('/:id', dishController.update);
dishRoutes.delete('/:id', dishController.delete);

export { dishRoutes };
