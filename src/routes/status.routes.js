import Router from 'express';
import { StatusController } from '../controllers/StatusController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const statusRoutes = Router();

const statusController = new StatusController();

statusRoutes.use(ensureAuthentication);

statusRoutes.get('/', statusController.index);
statusRoutes.get('/:id', statusController.show);
statusRoutes.post('/', ensureUserIsAdmin, statusController.create);
statusRoutes.put('/', ensureUserIsAdmin, statusController.update);
statusRoutes.delete('/:id', ensureUserIsAdmin, statusController.delete);

export { statusRoutes };
