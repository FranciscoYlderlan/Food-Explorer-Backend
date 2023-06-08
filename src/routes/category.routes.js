import Router from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.use(ensureAuthentication);

categoryRoutes.get('/', categoryController.index);
categoryRoutes.get('/:id', categoryController.show);
categoryRoutes.post('/', ensureUserIsAdmin, categoryController.create);
categoryRoutes.put('/', ensureUserIsAdmin, categoryController.update);
categoryRoutes.delete('/:id', ensureUserIsAdmin, categoryController.delete);

export { categoryRoutes };
