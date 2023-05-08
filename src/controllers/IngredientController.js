import { IngredientService } from '../services/ingredient/IngredientService.js';
import { IngredientRepository } from '../repositories/ingredient/Repository.js';

export class IngredientController {
    async index(request, response) {
        const ingredientRepository = new IngredientRepository();
        const ingredientService = new IngredientService(ingredientRepository);

        const ingredients = await ingredientService.index();

        return response.status(200).json(ingredients);
    }

    async show(request, response) {
        const { id } = request.params;

        const ingredientRepository = new IngredientRepository();
        const ingredientService = new IngredientService(ingredientRepository);

        const ingredient = await ingredientService.show(id);

        return response.status(200).json(ingredient);
    }

    async create(request, response) {
        const { name, picture, amount } = request.body;

        const ingredientRepository = new IngredientRepository();
        const ingredientService = new IngredientService(ingredientRepository);

        await ingredientService.create({ name, picture, amount });

        return response.status(201).json({});
    }

    async update(request, response) {
        const { name, picture, amount } = request.body;

        const ingredientRepository = new IngredientRepository();
        const ingredientService = new IngredientService(ingredientRepository);

        await ingredientService.update({ name, picture, amount });

        return response.status(200).json({ name, picture, amount });
    }

    async delete(request, response) {
        const { id } = request.params;

        const ingredientRepository = new IngredientRepository();
        const ingredientService = new IngredientService(ingredientRepository);

        await ingredientService.update({ id });

        return response.status(202).json({ id });
    }
}
