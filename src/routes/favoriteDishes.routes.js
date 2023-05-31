import Router from 'express';
import { FavoriteDishesController } from '../controllers/FavoriteDishesController.js';

const favoriteDishesRoutes = Router();

const favoriteDishesController = new FavoriteDishesController();

favoriteDishesRoutes.get('/', favoriteDishesController.index);
favoriteDishesRoutes.get('/:id', favoriteDishesController.show);
favoriteDishesRoutes.patch('/:id', favoriteDishesController.update);

export { favoriteDishesRoutes };
