import Router from 'express';
import { ProfileController } from '../controllers/ProfileController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(ensureAuthentication);

profileRoutes.get('/', profileController.index);
profileRoutes.get('/:id', profileController.show);
profileRoutes.post('/', ensureUserIsAdmin, profileController.create);
profileRoutes.put('/', ensureUserIsAdmin, profileController.update);
profileRoutes.delete('/:id', ensureUserIsAdmin, profileController.delete);

export { profileRoutes };
