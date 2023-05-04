import Router from 'express';
import { CategoryController } from '../controllers/CategoryController.js';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.get('/', categoryController.index);
categoryRoutes.get('/:id', categoryController.show);
categoryRoutes.post('/', categoryController.create);
categoryRoutes.put('/', categoryController.update);
categoryRoutes.delete('/:id', categoryController.delete);

export  { categoryRoutes };