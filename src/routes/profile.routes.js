import Router from 'express';
import { ProfileController } from '../controllers/ProfileController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(ensureAuthentication);

profileRoutes.get('/', profileController.index);
profileRoutes.get('/:id', profileController.show);
profileRoutes.post('/', profileController.create);
profileRoutes.put('/', profileController.update);
profileRoutes.delete('/:id', profileController.delete);

export  { profileRoutes };