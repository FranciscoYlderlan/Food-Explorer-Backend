import Router from 'express';
import { ProfileController } from '../controllers/ProfileController.js';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.get('/', profileController.index);
profileRoutes.get('/:id', profileController.show);
profileRoutes.post('/', profileController.create);
profileRoutes.put('/', profileController.update);
profileRoutes.delete('/:id', profileController.delete);

export  { profileRoutes };