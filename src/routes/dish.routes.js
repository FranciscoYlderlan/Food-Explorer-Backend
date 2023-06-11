import Router from 'express';
import { DishController } from '../controllers/DishController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';
import multer from 'multer';

import uploadConfigs from '../configs/uploads.js';

const upload = multer(uploadConfigs.MULTER);

const dishRoutes = Router();

const dishController = new DishController();

dishRoutes.use(ensureAuthentication);

dishRoutes.get('/', dishController.index);
dishRoutes.get('/:id', dishController.show);
dishRoutes.post('/', ensureUserIsAdmin, upload.single('picture'), dishController.create);
dishRoutes.put('/:id', ensureUserIsAdmin, upload.single('picture'), dishController.update);
dishRoutes.delete('/:id', ensureUserIsAdmin, dishController.delete);

export { dishRoutes };
