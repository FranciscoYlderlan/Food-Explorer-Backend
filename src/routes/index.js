import { Router } from 'express';
import { userRoutes } from './user.routes.js';
import { profileRoutes } from './profile.routes.js';

import { statusRoutes } from './status.routes.js';
import { dishRoutes } from './dish.routes.js';
import { categoryRoutes } from './category.routes.js';
import { ingredientRoutes } from './ingredient.routes.js';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/profile', profileRoutes);
routes.use('/status', statusRoutes);
routes.use('/favorite_dishes', profileRoutes);
routes.use('/dish', dishRoutes);
routes.use('/category', categoryRoutes);
routes.use('/ingredient', ingredientRoutes);

export { routes };
