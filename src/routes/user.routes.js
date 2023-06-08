import Router from 'express';
import { UserController } from '../controllers/UserController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';
const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', ensureAuthentication, ensureUserIsAdmin, userController.index);
userRoutes.get('/:id', ensureAuthentication, userController.show);
userRoutes.post('/', userController.create);
userRoutes.put('/:id', ensureAuthentication, userController.update);
userRoutes.delete('/:id', ensureAuthentication, ensureUserIsAdmin, userController.delete);

export { userRoutes };
