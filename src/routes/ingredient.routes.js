import Router from 'express';
import { IngredientController } from '../controllers/IngredientController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const ingredientRoutes = Router();

const ingredientController = new IngredientController();

ingredientRoutes.use(ensureAuthentication);

ingredientRoutes.get('/', ingredientController.index);
ingredientRoutes.get('/:id', ingredientController.show);
ingredientRoutes.post('/', ingredientController.create);
ingredientRoutes.put('/', ingredientController.update);
ingredientRoutes.delete('/:id', ingredientController.delete);

export  { ingredientRoutes };