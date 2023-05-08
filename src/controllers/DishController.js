import { DishRepository } from '../repositories/dish/Repository.js';
import { DishService } from '../services/dish/DishService.js';

export class DishController {
    async index(request, response) {
        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        // const dishes = await dishService.index();

        const ingredients = await dishRepository.findAllDishIngredients(1);

        return response.status(200).json(ingredients);
    }

    async show(request, response) {
        const { id } = request.params;

        return response.status(200).json({ id });
    }

    async create(request, response) {
        const { name, description, picture, price, category_id, ingredients } = request.body;

        const dishRepository = new DishRepository();
        const dishService = new DishService(dishRepository);

        await dishService.create({ name, description, picture, price, category_id, ingredients });

        return response.status(201).json({});
    }

    async update(request, response) {
        const { name, description, picture, price, category } = request.body;
        const { id } = request.params;

        return response.status(200).json({ name, password, email, avatar });
    }

    async delete(request, response) {
        const { id } = request.params;

        return response.status(202).json({ id });
    }
}
