import Router from 'express';
import { StatusController } from '../controllers/StatusController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const statusRoutes = Router();

const statusController = new StatusController();

statusRoutes.use(ensureAuthentication);

statusRoutes.get('/', statusController.index);
statusRoutes.get('/:id', statusController.show);
statusRoutes.post('/', statusController.create);
statusRoutes.put('/', statusController.update);
statusRoutes.delete('/:id', statusController.delete);

export { statusRoutes };
