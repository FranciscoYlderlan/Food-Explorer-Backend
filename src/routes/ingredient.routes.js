import Router from 'express';
import { IngredientController } from '../controllers/IngredientController.js';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin.js';

const ingredientRoutes = Router();

const ingredientController = new IngredientController();

ingredientRoutes.use(ensureAuthentication);

ingredientRoutes.get('/', ingredientController.index);
ingredientRoutes.get('/:id', ingredientController.show);
ingredientRoutes.post('/', ensureUserIsAdmin, ingredientController.create);
ingredientRoutes.put('/', ensureUserIsAdmin, ingredientController.update);
ingredientRoutes.delete('/:id', ensureUserIsAdmin, ingredientController.delete);

export { ingredientRoutes };
