import Router from 'express';
import { UserController } from '../controllers/UserController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', userController.index);
userRoutes.get('/:id', userController.show);
userRoutes.post('/', userController.create);
userRoutes.put('/:id', ensureAuthentication, userController.update);
userRoutes.delete('/:id', userController.delete);

export { userRoutes };
