import Router from 'express';
import { FavoriteDishesController } from '../controllers/FavoriteDishesController.js';

const favoriteDishesRoutes = Router();

const favoriteDishesController = new FavoriteDishesController();

favoriteDishesRoutes.get('/', favoriteDishesController.index);
favoriteDishesRoutes.get('/:user_id/:dish_id', favoriteDishesController.show);
favoriteDishesRoutes.patch('/:user_id/:dish_id', favoriteDishesController.update);

export { favoriteDishesRoutes };
